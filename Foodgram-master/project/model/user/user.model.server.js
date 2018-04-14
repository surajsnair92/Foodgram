module.exports = function (mongoose, q) {

    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);
    var q = require("q");

    UserModel.createUser = createUser;
    UserModel.findUserById = findUserById;
    UserModel.findUserByUsername = findUserByUsername;
    UserModel.findUserByCredentials = findUserByCredentials;
    UserModel.updateUser =  updateUser;
    UserModel.deleteUser = deleteUser;


    module.exports = UserModel;

    var api ={
        "createUser" : createUser,
        "findUserById" : findUserById,
        "findUserByUsername" : findUserByUsername,
        "findUserByCredentials" : findUserByCredentials,
        "updateUser" : updateUser,
        "deleteUser" : deleteUser,
        "findAllusers" : findAllusers,
        "findUserbytype" : findUserbytype,
        "findUserByFacebookId" : findUserByFacebookId
    };
    return api;

    function findUserByFacebookId(facebookId) {
        var deferred = q.defer();

        UserModel.findOne({'facebook.id': facebookId}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }


    function findUserbytype(type) {
        var deferred = q.defer();
        UserModel.find({type: type}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findAllusers() {
        return UserModel.find()
    }

    function createUser(user) {
        return UserModel.create(user)
    }

    function findUserById(userId) {
        return UserModel.findById(userId)
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.find({username: username}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({$and: [{username: username}, {password: password}]})
                }

    function updateUser(user) {
        var deferred = q.defer();
        UserModel.update(
            { _id : user.id },
            {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone
            }, function (err, user) {
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.findByIdAndRemove({_id: userId}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                user.remove();
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }


};
