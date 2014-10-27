angular.module('BestService', []).factory('Best', ['$http', function($http) {

    return {
        // call to get all bests
        get : function() {
            return $http.get('/api/bests');
        },
        // call to create a best
        create : function(userData) {
            console.log(bestData);
            return $http.post('/api/bests', bestData);
        },

        // call to DELETE a best
        delete : function(id) {
            return $http.delete('/api/bests/' + id);
        }
    }

}]);
