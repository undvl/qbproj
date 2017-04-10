var UsersDAO = require('../srv/users').UsersDAO;

const jwt = require('jsonwebtoken');

function DBAuthHandler(app, db){

    var users = new UsersDAO(db);

    function validateSignup(username, password, email, errors) {
        "use strict";
        var USER_RE = /^[a-zA-Z0-9_-]{3,20}$/; // /^[а-яёА-ЯЁa-zA-Z0-9-_.]?[а-яёА-ЯЁa-zA-Z0-9-_. ]{1,40}[а-яёА-ЯЁa-zA-Z0-9-_.]$/;
        var PASS_RE = /^.{3,20}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;

        errors['frmUsername_error'] = "";
        errors['frmPassword_error'] = "";
        errors['frmEmail_error'] = "";

        if (!USER_RE.test(username)) {
            errors['frmUsername_error'] = "Invalid username. try just letters and numbers.";
            return false;
        }
        if (!PASS_RE.test(password)) {
            errors['frmPassword_error'] = "Invalid password.";
            return false;
        }
        if (email != "") {
            if (!EMAIL_RE.test(email)) {
                errors['frmEmail_error'] = "Invalid email address.";
                return false;
            }
        }
        return true;
    }

    this.handleSignup = function(req, res, next) {
        "use strict";

        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;

        var errors = {};
        // set these up in case we have an error case
        if (validateSignup(username, password, email, errors)) {
            users.addUser(username, password, email, function(err, user) {
                "use strict";

                if (err) {
                    // this was a duplicate
                    if (err.code == '11000') {
                        if (err.errmsg.indexOf('username')>0) {
                            return res.send({type:'error', body:'Username already in use. Please choose another'});
                        }
                        else if (err.errmsg.indexOf('email')>0) {
                            return res.send({type:'error', body:'Email already in use. Please choose another'});
                        }
                        // else return res.send({type:'error', body:errmsg});
                    }
                    // this was a different error
                    else {
                        // return next(err);
                        return res.send({type:'error', body:err.errmsg});
                    }
                }

                //processLogin(req, res, username, password)
                return res.send({type:'success', body:{username: user.username}})

            });
        }
        else {
            let str = '';
            for ( let key in errors) { if(errors[key]) str = str + errors[key] + ' '; }
            return res.send({type:'error', body:str});
        }
    }
    
    this.handleLogin = function(req, res, next){
        "use strict";

        let username = req.body.username;
        let password = req.body.password;

        users.validateLogin(username, password, function(err, user) {
            "use strict";

            if (err) {
                if (err.no_such_user) {
                    return res.send({type:'error', body:'No such user'});
                }
                else if (err.invalid_password) {
                    return res.send({type:'error', body:'Invalid password'});
                }
                else {
                    // Some other kind of error
                    return next(err);
                }
            }

            //req.session.username = user.username;
            //setSessionState(req, res, user);
            
            jwt.sign({user:{username: user.username}}, app.get('jwtSecret'), {
                expiresIn: '24h'
            }, function(err, token){
                if(err){
                    return next(err);
                }
                console.log(username+' login success');
                return res.send({type:'success', body:{user:{username: user.username}, token:token}})
            })

        });
    }

}
module.exports = DBAuthHandler;
