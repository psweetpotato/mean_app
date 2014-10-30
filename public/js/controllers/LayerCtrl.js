angular.module('LayerCtrl', [])
  .controller('LayerController', ['$scope', function($scope) {
    $scope.layers = [
      {name: 'All'},
      {name: 'Bagels'},
      {name: 'Brunch'},
      {name: 'Burger'},
      {name: 'Coffee'},
      {name: 'Dessert'},
      {name: 'Doughnuts'},
      {name: 'Ice Cream'},
      {name: 'Pizza'},
      {name: 'Ramen'},
      {name: 'Sushi'},
      {name: 'Tacos'},
      {name: 'Pick a Category'}
    ];
    $scope.myLayers = $scope.layers[0];
  }]);
