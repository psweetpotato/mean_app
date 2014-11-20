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
        };
        $http.put(url, {friends: newFriendId})
          .success(function(data, status, headers, config) {
            console.log('success');
          })
          .error(function(data, status, headers, config) {
            console.log('error');
          });
        });
    }
}]);

// use later for adding more detailed user data

// $.get('api/users', function(req,res){
//         for (var i = 0; i < req.length; i++) {
//           if (req[i].local.email === newFriend){
//             var newFriendId = req[i]._id;
//             console.log(req[i]);
//             var newFriendEmail = req[i].email;
//           }
//         };
//         $http.put(url, {friends: {friendId: newFriendId, email: newFriendEmail}})
//           .success(function(data, status, headers, config) {
//             console.log('success');
//           })
//           .error(function(data, status, headers, config) {
//             console.log('error');
//           });
//         });
