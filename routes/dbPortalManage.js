const ObjectID = require('mongodb').ObjectID;

function DBPortalManageHandler(db){
    "use strict"

    this.groupAdd = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const qb = req.body.qb;

        db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
          if (err) return next(err);
          if (!member) return res.send({success: false, message: 'User is not a member of current portal.'});
          if (member.level > 1) return res.send({success: false, message: 'User has no permision.'});

          let params = {
            qb, user: username,
            name: req.body.groupName,
            minLevelAdd: Number(req.body.groupCanAddLvl),
            createdDate: new Date(),
            order: 0
          };
          if (req.body.groupCanViewLvl) params.minLevelView = Number(req.body.groupCanViewLvl);

          // find last order number of group
          db.collection('qb_portal_groups').find({qb}).sort({order:-1}).limit(1)
          .toArray((err, lastGroup) => {
            if (err) return next(err);
            if (lastGroup[0]) params.order = lastGroup[0].order + 1;

            // insert new group
            db.collection('qb_portal_groups')
            .insertOne(params, (err, r) => {
              if (err) {
                return res.send({type:'error', message:err.errmsg});
              }
              return res.send({ success: true, groupName: req.body.groupName });
            });
          });
        });
    }

    this.groupDel = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const groupID = ObjectID(req.body._id);

        db.collection('qb_portal_groups').findOne({ _id: groupID }, (err, group) => {
          if (err) return next(err);
          if (!group) return res.send({success: false, message: 'No such group found.'});
          const qb = group.qb;

          db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
            if (err) return next(err);
            if (!member) return res.send({success: false, message: 'User is not a member of current portal.'});
            if (member.level > 1) return res.send({success: false, message: 'User has no permision.'});

            db.collection('qb_portal_themes')
            .update({ qb, portalGroup: group.name }, { $set: { isDeleted: true, deletedDate: new Date(), deletedUser: username } },
              { multi: true}, (err, theme) => {
              if (err) return res.send({type:'error', message:err.errmsg});
              
              db.collection('qb_portal_groups')
              .update({ _id: groupID }, { $set: { isDeleted: true, deletedDate: new Date(), deletedUser: username } }, (err, group) => {
                if (err) return res.send({type:'error', message:err.errmsg});

                return res.send({ success: true, nModified: group.result.nModified });
              });
            });
          });
        });
    }

    this.themeAdd = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const qb = req.body.qb;
        const groupID = req.body.groupID;
        const themeTitle = req.body.themeTitle;
        const themeBody = req.body.themeBody;

        db.collection('qb_portal_groups').findOne({ _id: ObjectID(groupID) }, (err, group) => {
          if (err) return next(err);
          db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
            if (err) return next(err);
            if (!member) return res.send({success: false, message: 'User is not a member of current portal.'});
            if (member.level > group.minLevelAdd) return res.send({success: false, message: 'User has no permision.'});

            let params = {
              qb,
              user: username,
              name: themeTitle,
              portalGroup: group.name,
              text: themeBody,
              createdDate: new Date()
            };
            if (req.body.groupCanViewLvl) params.minLevelView = Number(req.body.groupCanViewLvl);

            db.collection('qb_portal_themes')
            .insertOne(params, (err, r) => {
              if (err) {
                return res.send({type:'error', message:err.errmsg});
              }
              return res.send({ success: true, themeTitle });
            });
          });
        });
    }

    this.themeDel = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const themeID = ObjectID(req.body._id);

        db.collection('qb_portal_themes').findOne({ _id: themeID }, (err, theme) => {
          if (err) return next(err);
          if (!theme) return res.send({success: false, message: 'No such theme found.'});
          const qb = theme.qb;

          db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
            if (err) return next(err);
            if (!member) return res.send({success: false, message: 'User is not a member of current portal.'});

            db.collection('qb_members').findOne({ qb, user: theme.user }, (err, themeUser) => {
              if (err) return next(err);
              if (!themeUser) return res.send({success: false, message: 'Theme don\'t have user.'});

              if (!(member.level <= 1 || member.level === 2 && themeUser.level >= 3
                  || member.level === 2 && username === theme.user)) {
                return res.send({success: false, message: 'User has no permision.'});
              }

              db.collection('qb_portal_themes')
              .update({ _id: themeID }, { $set: { isDeleted: true, deletedDate: new Date(), deletedUser: username } }, (err, theme) => {
                if (err) {
                  return res.send({type:'error', message:err.errmsg});
                }
                return res.send({ success: true, nModified: theme.result.nModified });
              });
            });
          });
        });
    }
}

module.exports = DBPortalManageHandler;
