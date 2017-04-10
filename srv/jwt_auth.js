var jwt = require('jsonwebtoken');

module.exports = function JwtAuth(app) {
    
    this.verifyToken = function(req, res, next){
        "use strict";

        let token = '';
        token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token && token !== '[object Object]') {
            jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
                if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
                }
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                return next();
            });

        } else {
            // //return res.sendStatus(403);
            // return res.status(403).send({
            //     success: false,
            //     message: 'No token provided'
            // });

            return next();
        }
    }
}