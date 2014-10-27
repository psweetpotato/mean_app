angular.module('BestCtrl', []).controller('BestController', ['$scope', '$http', 'Best',
  function($scope, $http, Best) {
    this.myBestForm = {};
    console.log(this.myBestForm);
    this.myBestForm.submitTheBestForm = function($http, bestData) {
      console.log($scope.best.myBestForm);
      var bestData = $scope.best.myBestForm;
      console.log(bestData);
      Best.create(bestData);
    };
}]);
