angular.module('UserCtrl', []).controller("UserController", ['$scope', '$http', 'User',
  function($scope, $http, User) {
    this.myForm = {};
    this.myForm.name;
    this.myForm.email;
    console.log(this.myForm);

    this.myForm.submitTheForm = function($http, userData){
      console.log($scope.user.myForm);
      User.create($scope.user.myForm);
    };

  }]);

