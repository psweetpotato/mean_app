angular.module('UserService', []).factory('User', ['$http', function($http) {
  return {
    // call to get all users
    get : function() {
      $http.get('/api/users');
    },
    create : function(userData) {
      console.log("factory create");
      console.log(userData);
      $http.post('/api/users', userData);
    },
    // call to DELETE a user
    delete : function(id) {
      $http.delete('/api/users/' + id);
    }
  };
}]);

