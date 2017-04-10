const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

function DBPortalHandler(app, db){
    "use strict"

    this.getUserParams = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        db.collection('qb_members').findOne({ qb: req.params.qb, user: username }, (err, elem) => {
          if (err) return next(err);
          return res.send({ success: true, qb, user, isOwner: elem.isOwner, level: elem.level });
        });
    }

    function themesList(qb, username, callback) {
        db.collection('qbs').findOne({ name: qb }, (err, elem) => {
          if (err) return callback(err, null);
          if (!elem) return callback(null, {success: false, message: 'Wrong portal.'});

          const isPrivate = !!elem.isPrivate;
          db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
            if (err) return callback(err, null);// next(err);
            if (isPrivate && !member) return callback(null, {success: false, message: 'User is not a member of current portal.'});//res.send({success: false, message: 'User is not a member of current portal.'});

            db.collection('qb_portal_groups')
            .find({ qb,
              $and: [
                { $or: [ { minLevelView: { $exists: 0 } }, { minLevelView: { $gte: (member ? member.level : null) } } ] },
                { $or: [ { isDeleted: { $exists: 0 } }, { isDeleted: false } ] }
              ]
            })
            .sort({ order: 1})
            .toArray((err, groups) => {
              if (err) {
                console.log(err);
                return callback(err, null);// next(err);
              }
              let cnt = 0;

              groups.forEach(item => {
                db.collection('qb_portal_themes')
                .find({ qb, portalGroup: item.name,
                  $or: [ { isDeleted: { $exists: 0 } }, { isDeleted: false } ]
                  }, { text: 0 })
                .sort({ createdDate: -1})
                .toArray((err, themes) => {
                  if (err) {
                    console.log(err);
                    return callback(err, null);// next(err);
                  }
                  item.themes = themes;

                  if (++cnt === groups.length) return callback(null, {success: true, groups});// res.send({success: true, groups});
                });
              });
            });
          })
        });
    }

    this.getThemesList = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const qb = req.params.qb;

        themesList(qb, username, (err, result) => {
          if (err) return next(err);
          return res.send(result);
        });
    }

    this.getThemesUserLevel = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const qb = req.params.qb;

        themesList(qb, username, (err, result) => {
          if (err) return next(err);
          let themesList = result.groups;
          let users = [];

          for (let i = 0, grCount = themesList.length; i < grCount; i++) {
            for (let j = 0, thCount = themesList[i].themes.length; j < thCount; j++) {
              if (themesList[i].themes[j].user) users.push(themesList[i].themes[j].user);
            }
          }
          users = getUnique(users);

          db.collection('qb_members')
          .find({ qb, user: { $in: users } }, { _id: 0, user: 1, level: 1 })
          .toArray((err, members) => {
            if (err) {
              console.log(err);
              return next(err);
            }
            if (!members) return {success: false, message: 'Themes not belong members of portal'}
            let membLevel = {};
            members.forEach((item, i) => {
              membLevel[item.user] = item.level;
            });
            
            for (let i = 0, grCount = themesList.length; i < grCount; i++) {
              for (let j = 0, thCount = themesList[i].themes.length; j < thCount; j++) {
                if (themesList[i].themes[j].user) {
                  themesList[i].themes[j].level = membLevel[themesList[i].themes[j].user];
                }
              }
            }
            return res.send(result);
          });
        });
    }

    this.getTheme = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const themeID = req.params.themeID;
        let isPrivate = false;
        
        db.collection('qb_portal_themes')
        .findOne({ _id: ObjectID(themeID) }, (err, theme) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          if (!theme) return res.send({success: false, message: 'Theme not found.'});
          if (theme.isDeleted) return res.send({success: false, message: 'Theme deleted.'});

          db.collection('qbs').findOne({ name: theme.qb }, (err, elem) => {
            if (err) return next(err);
            if (!elem) return res.send({success: false, message: 'Can\'t find qb.'});
            if(elem.isPrivate) isPrivate = true;

            db.collection('qb_members').findOne({ qb: theme.qb, user: username }, (err, member) => {
              if (err) return next(err);
              if (isPrivate && !member) return res.send({success: false, message: 'User is not a member of current portal.'});

              db.collection('qb_portal_groups').findOne({ qb: theme.qb, name: theme.portalGroup }, (err, portalGroup) => {
                if (err) return next(err);
                if (!portalGroup) return res.send({success: false, message: 'Can\'t find group.'});
                if (!(!portalGroup.minLevelView || member && member.level <= portalGroup.minLevelView)) return res.send({success: false, message: 'User has no permision to view.'});

                res.send({success: true, theme});
              });
            });
          });
        });


        // db.collection('qb_portal_themes')
        // .findOne({ _id: ObjectID(themeID) }, (err, theme) => {
        //   if (err) {
        //     console.log(err);
        //     return next(err);
        //   }
        //   res.send({success: true, theme});
        // });

        // db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
        //   if (err) return next(err);
        //   console.log(member);
        //   if (!member) return res.send({success: false, message: 'User is not a member of current portal.'});

        //   db.collection('qb_portal_groups')
        //   .find({ qb }, { _id: 0, name: 1, order: 1 })
        //   .sort({ order: 1})
        //   .toArray((err, groups) => {
        //     if (err) {
        //       console.log(err);
        //       return next(err);
        //     }

        //     let cnt = 0;


        //   });
        // })
    }

    function getUnique(arr){
      var u = {}, a = [];
      for(var i = 0, l = arr.length; i < l; ++i){
          if(u.hasOwnProperty(arr[i])) {
            continue;
          }
          a.push(arr[i]);
          u[arr[i]] = 1;
      }
      return a;
    }
}

module.exports = DBPortalHandler;
