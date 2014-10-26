angular.module("UserCtrl", [])
 .controller("UserController", [function($scope) {
    this.myForm = {};
    console.log(this.myForm);
    this.myForm.submitTheForm = function(){
      console.log(this.myForm);
      //code to add to database
    };
  }]);

