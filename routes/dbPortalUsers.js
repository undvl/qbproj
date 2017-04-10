const ObjectID = require('mongodb').ObjectID;

function DBPortalUsersHandler(db){
    "use strict"

    this.joinRequest = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const qb = req.body.qb;
        const params = {
          qb,
          user: username,
          isActive: true,
          createdDate: new Date()
        }
        if (req.body.comment) params.comment = req.body.comment;
        if (req.body.alias) params.alias = req.body.alias;

        db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
          if (err) return next(err);
          if (member) return res.send({success: false, message: 'User is already a member of current portal.'});

          db.collection('qb_membership_requests').findOne({ qb, user: username, isActive: true }, (err, mreq) => {
            if (err) return next(err);
            if (mreq) return res.send({success: false, message: 'User is already sent membership request.'});

            db.collection('qb_membership_requests').insertOne(params, (err, r) => {
              if (err) return next(err);

              return res.send({ success: true });
            });
          });
        });
    }

    this.getMembRequests = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const qb = req.params.qb;

        db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
          if (err) return next(err);
          if (!member) return res.send({success: false, message: 'User is not a member of current portal.'});
          if (member.level > 1) return res.send({success: false, message: 'User has no permision.'});

          const params = {
            qb,
            isActive: req.params.type === 'reqTypeNew'
          };
          db.collection('qb_membership_requests').find(params)
          .sort({ createdDate: -1 })
          .toArray((err, membReqs) => {
            if (err) next(err);

            res.send({ success: true, membReqs })
          });
        });
    }

    this.acceptJoinRequest = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const joinReqID = req.body.joinReqID;

        db.collection('qb_membership_requests').findOne({ _id: ObjectID(joinReqID), isActive: true }, (err, mreq) => {
            if (err) return next(err);
            if (!mreq) return res.send({success: false, message: 'Active join request not found.'});
            const qb = mreq.qb;

            db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
              if (err) return next(err);
              if (!member || member.level > 1) return res.send({success: false, message: 'User has no permision to accept join request.'});

              db.collection('qb_membership_requests').update({ _id: ObjectID(joinReqID) },
                { $set: { isActive: false, isAccepted: true, acceptedBy: username, acceptedDate: new Date() } },
                (err, mreqAcc) =>
              {
                if (err) return next(err);
                
                if (mreqAcc.result.nModified === 1) {
                  const params = {
                    qb,
                    user: mreq.user,
                    level: 3
                  };
                  if (mreq.alias) params.alias = mreq.alias;

                  db.collection('qb_members').insertOne(params, (err, r) => {
                    if (err) return next(err);

                    if (r.result.ok === 1) return res.send({ success: true, joinReqID });
                    return res.send({ success: false, message: 'Member table wasn\'t inserted' });
                  });

                }
                else return res.send({ success: false, message: 'Membership request table wasn\'t modified' });
              });
            });
        });
    }

    this.rejectJoinRequest = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const joinReqID = req.body.joinReqID;

        db.collection('qb_membership_requests').findOne({ _id: ObjectID(joinReqID), isActive: true }, (err, mreq) => {
            if (err) return next(err);
            if (!mreq) return res.send({success: false, message: 'Active join request not found.'});
            const qb = mreq.qb;

            db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
              if (err) return next(err);
              if (!member || member.level > 1) return res.send({success: false, message: 'User has no permision to reject join request.'});

              db.collection('qb_membership_requests').update({ _id: ObjectID(joinReqID) },
                { $set: { isActive: false, isAccepted: false, rejectedBy: username, rejectedDate: new Date() } },
                (err, mreqRej) =>
              {
                if (err) return next(err);

                if (mreqRej.result.nModified === 1) return res.send({ success: true, joinReqID });
                return res.send({ success: false, message: 'Membership request table wasn\'t modified' });
              });
            });
        });
    }

    this.getMembers = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const qb = req.params.qb;

        db.collection('qb_members').findOne({ qb, user: username }, (err, member) => {
          if (err) return next(err);
          if (!member) return res.send({success: false, message: 'User is not a member of current portal.'});
          if (member.level > 1) return res.send({success: false, message: 'User has no permision.'});

          db.collection('qb_members').find({ qb })
          .sort({ user: 1 })
          .toArray((err, membs) => {
            if (err) next(err);

            res.send({ success: true, members: membs })
          });
        });
    }

    this.changeMemberLevel = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        const membID = req.body.membID;
        const newLevel = req.body.newLevel;

        db.collection('qb_members').findOne({ _id: ObjectID(membID) }, (err, member) => {
            if (err) return next(err);
            if (!member) return res.send({success: false, message: 'Member row not found.'});
            const qb = member.qb;
            const oldLevel = member.level;

            db.collection('qb_members').findOne({ qb, user: username }, (err, requester) => {
              if (err) return next(err);
              if (!requester) return res.send({success: false, message: 'Requester is not a member of current portal.'});
              if (requester.level >= (oldLevel === '' ? 999 : oldLevel)
                || requester.level >= (newLevel === '' ? 999 : newLevel))
              {
                  return res.send({success: false, message: 'User has no permision to change level.'});
              }

              db.collection('qb_members').update({ _id: ObjectID(membID) },
                { $set: { level: newLevel, modifiedBy: username, modifiedDate: new Date() } },
                (err, r) =>
              {
                if (err) return next(err);

                if (r.result.nModified === 1) return res.send({ success: true });
                return res.send({ success: false, message: 'Members table wasn\'t modified' });
              });
            });
        });
    }
}

module.exports = DBPortalUsersHandler;
