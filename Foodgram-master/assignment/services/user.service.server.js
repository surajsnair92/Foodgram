
module.exports = function (app, userModel) {

    var facebookConfig = {
        clientID     : 665403380328118, //process.env.FACEBOOK_CLIENT_ID,
        clientSecret : "b9b55d4e78cf1da532d4ea42f19f480a", //process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : "/auth/facebook/callback", //process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'name', 'email']
    };

    var passport      = require('passport');
    var auth = authorized;
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.get("/api/user", findUser);
    app.get("/api/user/:userID", findUserByID);
    app.put("/api/user/:userID", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userID", deleteUser);
    app.put("/api/user/:userId/website/:websiteId", addWebsite);
    app.get("/auth/facebook", passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/assignment/#/user/' + req.user._id);
        });

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

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username,password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
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

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
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
        var userId = req.params.userID;
        var newUser = req.body;
        userModel.updateUser(userId, newUser)
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
    
    function addWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;
        userModel.addWebsite(userId, websiteId)
            .then(function (user) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }
};

