angular.module("UserCtrl", [])
 .controller("UserController", ['$scope', function($scope) {
    $scope.myForm = {};
    console.log($scope.myForm);
    $scope.myForm.submitTheForm = function(){
      console.log($scope.myForm);
      User.create($scope.myForm);
    };
  }]);
