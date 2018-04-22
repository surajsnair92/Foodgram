
module.exports = function (app, userModel, z, IPinfo) {

    var facebookConfig = {
        clientID     : "process.env.FACEBOOK_CLIENT_ID",
        clientSecret : "process.env.FACEBOOK_CLIENT_SECRET",
        callbackURL  : "process.env.FACEBOOK_CALLBACK_URL",
        profileFields: ['id', 'displayName', 'name', 'email']
    };

    var bcrypt = require("bcrypt-nodejs");
    var passport      = require('passport');
    var auth = authorized;
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;


    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/dpi/login', passport.authenticate('local'), login);
    app.get("/api/user", findUser);
    app.get("/api/currentUser", getCurrentUser);
    app.post('/api/register', register);
    app.get("/api/user/:userID", findUserByID);
    app.post("/dpi/user/update", updateUser);
    app.post("/dpi/user", createUser);
    app.delete("/api/user/:userID", deleteUser);
    app.put("/api/user/:userId/review/:reviewId", addReview);
    app.post("/api/users/:type", findUserbytype);
    app.post("/api/users/forgot/:mail", findUserbyMail);
    app.post('/api/logout', logout);
    app.get('/api/loggedin', loggedin);
    app.get("/api/location/ip", getMyLocation);

    app.get("/api/auth/facebook", passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/#/user/' + req.user._id);
        });

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function getCurrentUser(req, res) {
        res.send(req.user);
    }

    function getMyLocation(req, res) {
        $.getJSON('//ipinfo.io/json', function(data) {
            res.send(JSON.stringify(data, null, 2));
        });
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {

                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            type: "user",
                            email:    email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });
    }


    function findUserbytype(req, res) {
        var type = req.params.type;
        userModel.findUserbytype(type)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function findUserbyMail(req, res) {
        var mail = req.params.mail;
        userModel.findUserbyMail(mail)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel.createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(function(user) {
                    if (user.length == 0)
                    {
                        return done(null, false);
                    }
                    if(user[0] && bcrypt.compareSync(password, user[0].password))
                    {
                        return done(null, user[0]);
                    }
                     },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req, res);
        }
        else if(username){
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function (user) {
                if(user.length != 0){
                    res.json(user);
                }
                else{
                    res.sendStatus(500).send('err');
                }
            }, function (err) {
                res.sendStatus(500).send('err');

            });
    }

    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                if(user.length != 0){
                    res.json(user);
                }
                else{
                    res.sendStatus(500).send('err');
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByID(req, res) {
        var userID = req.params.userID;
        userModel.findUserById(userID)
            .then(function (user) {
                if(user.length != 0){
                    res.json(user);
                }
                else{
                    res.sendStatus(500).send('err');
                }
            }, function (err) {
                res.sendStatus(404).send({message: 'User Not Found'});
            });
    }

    function updateUser(req, res) {
        var newUser = req.body;
        userModel.updateUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userID;
        userModel.deleteUser(userId)
            .then(function (user) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    
    function addReview(req, res) {
        var userId = req.params.userId;
        var reviewId = req.params.reviewId;
        userModel.addReview(userId, reviewId)
            .then(function (user) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

};

