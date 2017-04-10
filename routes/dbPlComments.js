const ObjectID = require('mongodb').ObjectID;

function DBPlCommentsHandler(db){
    "use strict"

    this.getComments = function(req, res, next) {
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
            if (elem.isPrivate) isPrivate = true;

            db.collection('qb_members').findOne({ qb: theme.qb, user: username }, (err, member) => {
              if (err) return next(err);
              if (isPrivate && !member) return res.send({success: false, message: 'User is not a member of current portal.'});

              db.collection('qb_portal_groups').findOne({ qb: theme.qb, name: theme.portalGroup }, (err, portalGroup) => {
                if (err) return next(err);
                if (!portalGroup) return res.send({success: false, message: 'Can\'t find group.'});
                if (!(!portalGroup.minLevelView || member && member.level <= portalGroup.minLevelView)) return res.send({success: false, message: 'User has no permision to view.'});

                db.collection('qb_theme_comments').findOne({ themeID: ObjectID(themeID) }, (err, comments) => {
                if (err) return next(err);
                if (!comments) return res.send({success: false, message: 'Can\'t find comments.'});

                  res.send({success: true, comments});
                });
              });
            });
          });
        });
    }

    this.commentAdd = function(req, res, next) {
        let username;

        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const themeID = req.body.themeID;
        const elemAddr = req.body.elemAddr;
        const text = req.body.text;

        function commsCount (obj, arr) {
          // console.log(obj);
          // console.log(arr);
          const nextObj = arr.length > 0 ? obj.comments[arr[0]] : obj;

          if (arr.length <= 1) return nextObj.comments ? nextObj.comments.length : 0;

          arr.splice(0, 1);
          return commsCount(nextObj, arr);
        }

        db.collection('qb_portal_themes')
        .findOne({ _id: ObjectID(themeID) }, (err, theme) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          if (!theme) return res.send({success: false, message: 'Theme not found.'});
          if (theme.isDeleted) return res.send({success: false, message: 'Theme deleted.'});

          db.collection('qb_members').findOne({ qb: theme.qb, user: username }, (err, member) => {
            if (err) return next(err);
            if (!member) return res.send({success: false, message: 'User is not a member of current portal.'});

            db.collection('qb_portal_groups').findOne({ qb: theme.qb, name: theme.portalGroup }, (err, portalGroup) => {
              if (err) return next(err);
              if (!portalGroup) return res.send({success: false, message: 'Can\'t find group.'});
              if (!(!portalGroup.minLevelView || member && member.level <= portalGroup.minLevelView)) return res.send({success: false, message: 'User has no permision to view (and add comment).'});

              const addrArr = elemAddr ? elemAddr.split(';') : [];
              const addrStr = addrArr.reduce((str, num) => {
                return `${str}.comments.${num}`;
              }, '').substr(1);

              db.collection('qb_theme_comments').findOne({ themeID: ObjectID(themeID) }, (err, targetComm) => {
                if (err) return next(err);

                const nextCommNum = commsCount(targetComm, addrArr);
                // console.log(nextCommNum);
                const newComment = {};
                const finalAddStr = `${addrStr}.comments`.replace(/^\./,'');
                const newElemAddr = `${elemAddr ? elemAddr : ''};${nextCommNum}`.replace(/^;/,'')

                // console.log(finalAddStr);
                newComment[finalAddStr] = {elemAddr: newElemAddr, date: new Date(), user: username, text};
                if (theme.user === username) newComment[finalAddStr].isAuthor = true;

                db.collection('qb_theme_comments').update({ themeID: ObjectID(themeID) },
                  { $push: newComment },
                  (err, commUpd) => {
                  if (err) return next(err);

                  return res.send({ success: true/*, nModified: group.result.nModified*/ });
                });
              });
            });
          });
        });
    }

}

module.exports = DBPlCommentsHandler;
