(function () {
    angular
        .module("Project")
        .factory("UserService", userService);

    function userService($http) {

        var api ={
            "createUser" : createUser,
            "login" : login,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "findUserbyMail": findUserbyMail,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser,
            "addReview" : addReview,
            "findUserbytype" : findUserbytype,
            "register" : register,
            "logout" : logout,
            "getMyLocation" : getMyLocation
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function getMyLocation() {
            return $http.get("/api/location/ip");
        }
        
        function login(user) {
            return $http.post("/dpi/login", user);
        }

        function logout() {
            return $http.post('/api/logout');
        }

        function findUserbyMail(mail) {
            return $http.post("/api/users/forgot/" +mail);
        }

        function findUserbytype(type) {
            return $http.post("/api/users/" +type);
        }

        function createUser(user) {
            return $http.post("/dpi/user", user);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, newUser) {
            return $http.post("/dpi/user/update", newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

        function addReview(userId, reviewId) {
            return $http.put("/api/user/"+userId+"/review/"+reviewId);
        }
    }

})();