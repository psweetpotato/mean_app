angular.module('BestService', []).factory('Best', ['$http', function($http) {
  return {
    get : function() {
      $http.get('/api/bests');
    },
    create : function(bestData) {
      console.log(bestData);
      $http.post('/api/bests', bestData);
    },
    delete : function(id) {
      $http.delete('/api/bests/' + id);
    }
  };
}]);
