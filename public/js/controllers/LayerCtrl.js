var controllersMod = angular.module('LayerCtrl', [])
  .controller('LayerController', ['$scope', '$http', function($scope, $http) {
    $scope.layers = [
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
      {name: 'Tacos'}
    ];
    $scope.myLayers = $scope.layers[0];
    categoryLayer = L.layerGroup();

    $scope.visible = false;

    $scope.changeOwner = function(){
      $scope.owner = true;
    };

    $scope.close = function(){
      $scope.visible = false;
      $scope.owner = false;
    };
    $scope.toggle = function() {
      if ($scope.owner === true) {
        $scope.visible = !$scope.visible;
        catText = this.layer.name;
        console.log(catText);
        $('#addDivHead').text(catText);
      }
    };

    var addAll = function(){
      $.get('/api/bests',  function(req, res) {
        console.log(req);
        for (var i = 0; i < req.length; i++) {
          var venue = req[i].name;
          var latlng = L.latLng(req[i].lat, req[i].lon);
          var address = req[i].address;
          var marker = L.marker(latlng, {
            icon: L.mapbox.marker.icon({
              'marker-color': '#F9AC6D',
              'marker-symbol': 'restaurant',
              'marker-size': 'medium'
            })
          })
            .bindPopup(venue +'<br/>' + address +"<br/>")
              .addTo(categoryLayer);
        }
      });
    };
    $(map).ready(function() {
      addAll();
      categoryLayer.addTo(map);
    });

    $(".overlay").on('click', '#all', function(){
      categoryLayer.clearLayers(map);
      addAll();
    });


      $(".overlay").on('click', '.cat', function(){
        if ($scope.owner !== true) {
        categoryLayer.clearLayers(map);
          var catText = this.innerText;
          console.log(catText);
          console.log($scope.owner);
            $.get('/api/bests',  function(req, res) {
              for (var i = 0; i < req.length; i++) {
                if (req[i].category == catText) {
                  var venue = req[i].name;
                  var latlng = L.latLng(req[i].lat, req[i].lon);
                  var address = req[i].address;
                  var marker = L.marker(latlng, {
                    icon: L.mapbox.marker.icon({
                      'marker-color': '#F9AC6D',
                      'marker-symbol': 'restaurant',
                      'marker-size': 'medium'
                    })
                  })
                    .bindPopup(venue +'<br/>' + address +"<br/>")
                      .addTo(categoryLayer);
                }
              };
            });
        } else {
          categoryLayer.clearLayers(map);
            var catText = this.innerText;
            $.get('/api/bests',  function(req, res) {
              for (var i = 0; i < req.length; i++) {
                if (req[i].category == catText) {
                  console.log($scope.owner);
                  console.log(req[i]);
                  $scope.suggestions = [];
                  $scope.suggestions.push({name: req[i].name, address: req[i].address, lon: req[i].lng, lat: req[i].lat, venue_id: req[i].id });
                  $scope.$digest();
                };
              }
            });
        }
      });
  $(".overlay").on('click', '#mine', function(){
    categoryLayer.clearLayers(map);
    var userid = $('#userId').text();
    $.get('/api/bests',  function(req, res) {
      for (var i = 0; i < req.length; i++) {
        var thisUser = req[i].user.toString();
        if (thisUser == userid) {
          var venue = req[i].name;
          var latlng = L.latLng(req[i].lat, req[i].lon);
          var address = req[i].address;
          var marker = L.marker(latlng, {
            icon: L.mapbox.marker.icon({
              'marker-color': '#F9AC6D',
              'marker-symbol': 'restaurant',
              'marker-size': 'medium'
            })
          })
            .bindPopup(venue +'<br/>' + address +"<br/>")
              .addTo(categoryLayer);
        }
      }
    });
  });
  }]);


