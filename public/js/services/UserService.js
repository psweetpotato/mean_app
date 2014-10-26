// public/js/services/UserService.js
angular.module('app', []).factory('User', ['$http', function($http) {

    return {
        // call to get all users
        get : function() {
            return $http.get('/api/users');
        },

        create : function(userData) {
          console.log("factory create");
            return $http.post('/api/users', userData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    };

}]);

