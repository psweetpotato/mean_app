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
    var sidebar = $('.overlay');
    var mysidebar = $('.CAToverlay');

    $scope.myLayers = $scope.layers[0];
    categoryLayer = L.layerGroup();
    $scope.visible = false;
    $scope.owner = false;

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
        console.log('number1');
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
      console.log('call addall');
      categoryLayer.addTo(map);
    });

    sidebar.on('click', '.AllDiv', function(){
      categoryLayer.clearLayers(map);
      addAll();
      console.log('call addall 2');
    });


      sidebar.on('click', '.cat', function(){
        if ($scope.owner !== true) {
        categoryLayer.clearLayers(map);
          var catText = this.innerText;
          console.log(catText);
          console.log($scope.owner);
            $.get('/api/bests',  function(req, res) {
              console.log('number2');
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
              console.log('number3');
              $scope.suggestions = [];
              for (var i = 0; i < req.length; i++) {
                if (req[i].category == catText) {
                  console.log($scope.owner);
                  console.log(req[i]);
                  $scope.suggestions.push({name: req[i].name, address: req[i].address, lon: req[i].lng, lat: req[i].lat, venue_id: req[i].id });
                  $scope.$digest();
                };
              }
            });
        }
      });

  sidebar.on('click', '.MyDiv', function(){
    categoryLayer.clearLayers(map);
    var userid = $('#userId').text();
    $.get('/api/bests',  function(req, res) {
      console.log('call4');
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


