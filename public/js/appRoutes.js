angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/newuser', {
      templateUrl: 'views/user.html',
      controller: 'UserController'
    });
  $locationProvider.html5Mode(true);
}]);
