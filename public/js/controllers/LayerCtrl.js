var controllersMod = angular.module('LayerCtrl', ['angular.filter'])
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
    $scope.bests = [];
    var navbar = $('.maindiv'),
      mysidebar = $('.overlay');

    $scope.myLayers = $scope.layers[0];
    $scope.visible = false;
    $scope.owner = false;

    categoryLayer = L.layerGroup();
    myLayer = L.layerGroup();
    friendLayer = L.layerGroup();


    $scope.changeOwner = function(){
      $scope.owner = true;
    };
    $scope.close = function(){
      $scope.visible = false;
      $scope.owner = false;
      addAll();
      searchLayer.clearLayers(map);
    };
    $scope.toggle = function() {
      if ($scope.owner === true) {
        $scope.visible = !$scope.visible;
        catText = this.layer.name;
        console.log(catText);
        $('#addDivHead').text(catText);
      }
    };
    $scope.addSug = function(){
      console.log(this.suggestion.venue_id);
      var place = this.suggestion.venue_id;
      var venue = this.suggestion.name;
        var latlng = L.latLng(this.suggestion.lat, this.suggestion.lon),
          address = this.suggestion.address,
          id = this.suggestion.venue_id;
        var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#F9AC6D',
            'marker-symbol': 'restaurant',
            'marker-size': 'medium'
          })
         })
            .bindPopup(
          '<span ng-controller="LayerController"><strong><a href="https://foursquare.com/v/' + this.suggestion.venue_id + '" target="_blank">' +
          venue +
          "</a></strong><br/><button class='addSug' ng-click='addBest()' data-venue_id='" + place + "' " + " class='" + venue + "'>Add</button></span>")
          .addTo(categoryLayer);

    };
    $("#map").on('click', '.addSug', function(){
      console.log('clicked!', this);
      userId = $('#userId').text();
      var catText = $('#addDivHead').text();
      var number = $(this).data().venue_id.toString();
      console.log($(this).data().venue_id);
      console.log($scope.suggestions);
      for (var i = 0, sugLen = $scope.suggestions.length; i < sugLen; i ++){
        if ($scope.suggestions[i].venue_id === number){
          var selectedSug = $scope.suggestions[i].venue_id;
          $http.put('/api/bests/'+number, {user: userId})
            .success(function(data, status, headers, config) {
              console.log('success');
            })
            .error(function(data, status, headers, config) {
              console.log('error');
              });
          $(this).hide();
            var url = 'api/users/' + userId;
            $http.put(url, {newBest: selectedSug.venue_id, catName: catText})
              .success(function(data, status, headers, config) {
                console.log('success');
              })
              .error(function(data, status, headers, config) {
                console.log('error');
              });
          break;
        }
      }
    });
    var addAll = function(){
      $.get('/api/bests',  function(req, res) {
        console.log('number1');
        var userid = $('#userId').text();
        for (var i = 0, addAllLen = req.length; i < addAllLen; i++) {
          var thisUser = req[i].user.toString();
          if (thisUser == userid) {
            var venue = req[i].name,
              latlng = L.latLng(req[i].lat, req[i].lon),
              address = req[i].address,
              marker = L.marker(latlng, {
              icon: L.mapbox.marker.icon({
                'marker-color': '#F9AC6D',
                'marker-symbol': 'restaurant',
                'marker-size': 'medium'
              })
            })
              .bindPopup(venue +'<br/>' + address +"<br/>")
                .addTo(myLayer);
                $scope.bests.push({name: venue, add: address, cat:req[i].category})
              // $scope.bests.push([venue, address, req[i].category]);
              $scope.bests.sort(function(a, b) {
                return a.cat > b.cat ? 1 : -1;
              });
              console.log($scope.bests);
          } else {
            var venue = req[i].name,
              latlng = L.latLng(req[i].lat, req[i].lon),
              address = req[i].address,
              marker = L.marker(latlng, {
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
    };

    $(map).ready(function() {
      addAll();
      categoryLayer.addTo(map);
    });

    navbar.on('click', '#all', function(){
      categoryLayer.clearLayers(map);
      friendLayer.clearLayers(map);
      addAll();
      myLayer.clearLayers(map);
    });

    navbar.on('click', '#mine', function(){
      categoryLayer.clearLayers(map);
      friendLayer.clearLayers(map);
      myLayer.addTo(map);
    });

      navbar.on('click', '.cat', function(){
        categoryLayer.clearLayers(map);
        friendLayer.clearLayers(map);
        myLayer.clearLayers(map);
        if ($scope.owner !== true) {
          var catText = this.innerText;
          console.log(catText);
          console.log($scope.owner);
          $.get('/api/bests',  function(req, res) {
            console.log('number2');
            for (var i = 0, catLen = req.length; i < catLen; i++) {
              if (req[i].category == catText) {
                var venue = req[i].name,
                  latlng = L.latLng(req[i].lat, req[i].lon),
                  address = req[i].address,
                  marker = L.marker(latlng, {
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
          friendLayer.clearLayers(map);
            var catText = this.innerText;
            $.get('/api/bests',  function(req, res) {
              console.log('number3');
              $scope.suggestions = [];
              for (var i = 0, sugLen = req.length; i < sugLen; i++) {
                if (req[i].category == catText) {
                  console.log($scope.owner);
                  console.log(req[i]);
                  $scope.suggestions.push({name: req[i].name, address: req[i].address, lon: req[i].lon, lat: req[i].lat, venue_id: req[i].venue_id, category: req[i].category});
                  $scope.$digest();
                };
              }
            });
        }
      });

  navbar.on('click', '#friends', function(){
    categoryLayer.clearLayers(map);
    friendLayer.clearLayers(map);
    var userId = $('#userId').text();
    var url = '/api/users/' + userId;
    $scope.tempFriends = [];
    $.get(url,  function(req, res) {
      console.log(req);
      var following = req.local.following;
      for (var i = 0, friendLen = following.length; i < friendLen; i++) {
        console.log(following[i]);
          $scope.tempFriends.push(following[i]);
          $scope.$digest();
      };
    });
    $.get('/api/users', function(req, res){
      $scope.friends = [];
      for (var i = 0, len = $scope.tempFriends.length; i < len; i++){
        var friendId = $scope.tempFriends[i];
        for (var x = 0, len = req.length; x < len; x++){
          if (req[x]._id === friendId) {
            console.log(req[x].local);
            if (req[x].local.name) {
            newFriend = [friendId, req[x].local.name];
          } else {
            newFriend = [friendId,req[x].local.email];
          }
            $scope.friends.push(newFriend);
            $scope.$digest();
          }
        }
      }
      console.log($scope.friends);

    });
      $.get('/api/bests',  function(req, res) {
        for (var x = 0, len = $scope.tempFriends.length; x < len; x++){
          var friendId = $scope.tempFriends[x];
          for (var i = 0; i < req.length; i++) {
            if ($.inArray(friendId, req[i].user) != -1) {
              console.log(friendId);
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
        }
      });
  });

$scope.filterFriendsBests = function (){
      categoryLayer.clearLayers(map);
      friendLayer.clearLayers(map);
      friendLayer.addTo(map);
      var currentFriend = this.friend[0];
      console.log(this.friend[0]);
      $.get('/api/bests',  function(req, res) {
        for (var i = 0, len = req.length; i < len; i++) {
          if (req[i].user.toString() === currentFriend) {
            var venue = req[i].name,
              latlng = L.latLng(req[i].lat, req[i].lon),
              address = req[i].address,
              marker = L.marker(latlng, {
              icon: L.mapbox.marker.icon({
                'marker-color': '#F9AC6D',
                'marker-symbol': 'restaurant',
                'marker-size': 'medium'
              })
          })
            .bindPopup(venue +'<br/>' + address +"<br/>")
              .addTo(friendLayer);
        }
      }
    });
  };
  }]);


