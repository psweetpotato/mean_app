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
      var userId = $('#userId').text();
      var url = 'api/users/' + userId;
      console.log(url);
      $.get('api/users', function(req,res){
        for (var i = 0; i < req.length; i++) {
          if (req[i].local.email === newFriend){
            var newFriendId = req[i]._id;
          }
        }
      });
      $http.put(url, , function(req, res){
        console.log(req.friends);
        // req.friends.push(newFriendId);
      });
    }
}]);
