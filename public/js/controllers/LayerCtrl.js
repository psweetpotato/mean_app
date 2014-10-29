angular.module('LayerCtrl', [])
  .controller('LayerController', ['$scope', function($scope) {
    $scope.layers = [
      {name: 'All'},
      {name: 'Bagels'},
      {name: 'Pizza'},
      {name: 'Coffee'},
      {name: 'Brunch'},
      {name: 'Sushi'},
      {name: 'Tacos'},
      {name: 'Doughnuts'},
      {name: 'Ramen'},
      {name: 'Burger'},
      {name: 'Ice Cream'},
      {name: 'Sushi'},
      {name: 'Dessert'}
    ];
    $scope.myLayers = $scope.layers[0];
  }]);
