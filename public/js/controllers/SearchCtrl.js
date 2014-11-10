function SearchCtrl($scope, $http){
    var searchAll = L.layerGroup().addTo(map);
    $scope.search = function(){
      searchword = $scope.keywords;
      categoryLayer.clearLayers(map);
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
      for (var i = 0; i < result.response.venues.length; i++) {
        var venue = result.response.venues[i];
        console.log(venue);
        var latlng = L.latLng(venue.location.lat, venue.location.lng);
        var marker = L.marker(latlng, {
            icon: L.mapbox.marker.icon({
              'marker-color': '#F96D6D',
              'marker-symbol': 'restaurant',
              'marker-size': 'large'
            })
          })
        .bindPopup(
          '<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
          venue.name +
          "</a></strong><br/><button class='addBest' data-venue_id='" + i + "' " + " class='" + venue.name + "'>Add</button>")
          .addTo(categoryLayer);
      }
    });
    $("#map").on('click', '.addBest', function(){
      console.log('clicked!', this);
      var number = $(this).data().venue_id;
      console.log(venues[number]);
      $http.post('/api/bests',
        {name: venues[number].name,
        lat: venues[number].location.lat,
        lon: venues[number].location.lng,
        address: venues[number].location.address,
        category: 'All', //FIXME hardcoded
        category_id: 0,
        venue_id: venues[number].id
      });
        $(this).hide();
    });
  };
  }

