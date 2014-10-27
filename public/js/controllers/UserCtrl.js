
appModule.controller("UserController", ['$scope', '$http', 'UserFactory',
  function($scope, $http, UserFactory) {
    this.myForm = {};
    console.log(this.myForm);

    this.myForm.submitTheForm = function($http, userData){
      console.log(this.myForm);
      var userData = this.myForm;
      $http.post('/api/users', userData)
    };

  }]);

