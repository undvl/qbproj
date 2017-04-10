function DBQBHandler(db){
    "use strict"

    this.getUserParams = function(req, res, next) {
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }
        let qb = req.params.qb;

        db.collection('qbs').findOne({ name: qb }, (err, qbElem) => {
          if (err) return next(err);
          if (!qbElem) return res.send({ success: false, message: 'QB don\'t found.' });

          db.collection('qb_members').findOne({ qb, user: username }, (err, elem) => {
            if (err) return next(err);
            if (elem) return res.send({ success: true, qb, qbTitle: qbElem.title, userParams: {user: username, isOwner: elem.isOwner, level: elem.level } });
            else res.send({ success: true, qb, qbTitle: qbElem.title, userParams: { user: username } });
          });
        });
    }

    this.createQB = function(req, res, next){
        let username;
        if(req.decoded && req.decoded.user) {
          username = req.decoded.user.username;
        }

        // let params = Object.assign({}, req.body);
        // params.owner = username;
        // for(let item in params) {
        //   if (params[item] === '') delete params[item];
        // }

        let params = { name: req.body.name, owner: username, title: req.body.title };
        if (req.body.category && req.body.category !== '') params.category = req.body.category;
        if (req.body.catDescr && req.body.catDescr == 'other' && req.body.catDescr !== '') params.catDescr = req.body.catDescr;
        if (req.body.tags && req.body.tags !== '') params.tags = req.body.tags;

        db.collection('qbs')
        .insertOne(params, (err, r) => {
            if (err) {
                // this was a duplicate
                if (err.code == '11000') {
                    if (err.errmsg.indexOf('name')>0) {
                        return res.send({type:'error', message:'URL already in use. Please choose another'});
                    }
                    // else return res.send({type:'error', body:errmsg});
                }
                // this was a different error
                else {
                    // return next(err);
                    return res.send({type:'error', message:err.errmsg});
                }
            }
            db.collection('qb_members')
            .insertOne({ qb: params.name, user: params.owner, isOwner: true, level: 0 }, (err,r) => {
                if (err) {
                    return res.send({type:'error', message:err.errmsg});
                }
                return res.send({ success: true, name: params.name });
            });
        });
    }

    this.getCategories = function(req, res, next){

        db.collection('qbs_categories')
        .find({}, { _id: 0, name: 1, order: 1 })
        .sort({ order: 1})
        .toArray((err, categoriesList) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          return res.send({ categoriesList });
        });
    }

}

module.exports = DBQBHandler;
