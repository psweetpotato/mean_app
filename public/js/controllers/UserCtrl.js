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
      $scope.email = "";
      userId = $('#userId').text();
      var url = 'api/users/' + userId;
      console.log(url);
      $.get('api/users', function(req,res){
        for (var i = 0, len = req.length; i < len; i++) {
          if (req[i].local.email === newFriend){
            var friendId = req[i]._id;
            console.log("friend request")
            console.log(req[i]);
          }
        };

        $http.put(url, {following: friendId})
        .success(function(data, status, headers, config) {
          console.log('success');
        })
        .error(function(data, status, headers, config) {
          console.log('error');
        });

        var theirUrl = 'api/users/' + friendId;
        console.log(theirUrl+ ' line 36');
        console.log(userId+ ' line 37');
        $http.put(theirUrl, {followers: userId})
          .success(function(data, status, headers, config) {
            console.log('success');
          })
          .error(function(data, status, headers, config) {
            console.log('error');
            console.log(userId);
          });
      });
    }

}]);

