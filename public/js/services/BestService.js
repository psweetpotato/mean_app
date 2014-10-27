angular.module('BestService', []).factory('Best', ['$http', function($http) {
  return {
    // call to get all bests
    get : function() {
      $http.get('/api/bests');
    },
    // call to create a best
    create : function(bestData) {
      console.log(bestData);
      $http.post('/api/bests', bestData);
      },
    // call to DELETE a best
    delete : function(id) {
      $http.delete('/api/bests/' + id);
    }
  };
}]);
