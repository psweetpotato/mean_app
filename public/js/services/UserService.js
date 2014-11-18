controllersMod.factory('User', ['$http', function($http) {
  return {
    get : function() {
      $http.get('/api/users');
    },
    create : function(userData) {
      console.log("factory create");
      console.log(userData);
      $http.post('/api/users', userData);
    },
    delete : function(id) {
      $http.delete('/api/users/' + id);
    }
  };
}]);
