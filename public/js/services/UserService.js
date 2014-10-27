angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get all users
        get : function() {
            return $http.get('/api/users');
        },

        create : function(userData) {
          console.log("factory create");
          $http.post('/api/users', userData);
        },

        // call to DELETE a user
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    };

}]);

