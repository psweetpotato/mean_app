controllersMod.controller('SearchController', ['$scope', '$http', function($scope, $http) {
    searchLayer = L.layerGroup().addTo(map);
    $scope.search = function(){
      var searchword = $scope.keywords;
      var CLIENT_ID = 'EDQQDZUP4CDNAVQTBA40QGR5FC5WPEASPLT5RX1B5XFOAGX5';
      var CLIENT_SECRET = 'U4MOAXGON03440H1RK0ZG1NUF11DT3TY24FQXPARVGGBOS4T';
      var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
        '?client_id=CLIENT_ID' +
        '&client_secret=CLIENT_SECRET' +
        '&v=20130815' +
        '&ll=LATLON' +
        '&query='+ searchword +
        '&limit=7'+
        '&callback=?';

    $.getJSON(API_ENDPOINT
      .replace('CLIENT_ID', CLIENT_ID)
      .replace('CLIENT_SECRET', CLIENT_SECRET)
      .replace('LATLON', map.getCenter().lat +
          ',' + map.getCenter().lng), function(result, status) {
        if (status !== 'success') return alert('Request to Foursquare failed');
          venues = result.response.venues;
          for (var i = 0, venueLen = venues.length; i < venueLen; i++) {
            var venue = venues[i],
            latlng = L.latLng(venue.location.lat, venue.location.lng),
            marker = L.marker(latlng, {
              icon: L.mapbox.marker.icon({
                'marker-color': '#F96D6D',
                'marker-symbol': 'restaurant',
                'marker-size': 'medium'
              })
            })
            .bindPopup(
              '<span ng-controller="SearchController"><strong><a href="https://foursquare.com/v/' + venue.id + '" target="_blank">' +
              venue.name +
              "</a></strong><br/><button class='addBest' ng-click='addBest()' data-venue_id='" + i + "' " + " class='" + venue.name + "'>Add</button></span>")
                .addTo(searchLayer);
          }
      });
    };

    $("#map").on('click', '.addBest', function(){
      console.log('clicked!', this);
      var number = $(this).data().venue_id;
      console.log($(this).data().venue_id);
      console.log(venues[number]);
      var catText = $('#addDivHead').text();
      $http.post('/api/bests',
        {name: venues[number].name,
        lat: venues[number].location.lat,
        lon: venues[number].location.lng,
        address: venues[number].location.address,
        category: catText,
        venue_id: venues[number].id
        }
      );
        $(this).hide();
      userId = $('#userId').text();
      var url = 'api/users/' + userId;
      console.log(venues[number].id);
      $http.put(url, {newBest: venues[number].id, catName: catText})
        .success(function(data, status, headers, config) {
          console.log('success');
        })
        .error(function(data, status, headers, config) {
          console.log('error');
        });
    });
}]);

