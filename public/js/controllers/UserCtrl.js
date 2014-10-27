
angular.module('UserCtrl', []).controller("UserController", ['$scope', '$http', 'User',
  function($scope, $http, User) {
    this.myForm = {};
    console.log(this.myForm);

    this.myForm.submitTheForm = function($http, userData){
      console.log(this.myForm);
      var userData = this.myForm;
      $http.post('/api/users', userData)
    };

  }]);

