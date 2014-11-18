controllersMod.controller('UserController', ['$scope', '$http', 'User', function($scope, $http, User) {
    this.myForm = {};
    this.myForm.name;
    this.myForm.email;
    console.log(this.myForm);

    this.myForm.submitTheForm = function($http, userData){
      console.log($scope.user.myForm);
      var userData = $scope.user.myForm;
      console.log(userData);
      User.create(userData);
    };

    $scope.addFriend = function(){
      var newFriend = $scope.email;
      $.get('api/users', function(req,res){
        for (var i = 0; i < req.length; i++) {
          console.log(req[i]);
        }
      });
      // var userId = $('#userId').text();
      // var url = '/api/users/' + userId;
      // $.put(url, function(req, res){

      // });
    }
}]);
