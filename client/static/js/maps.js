google.maps.event.addDomListener(window, 'load', function(){
  initMap();
  initAutocomplete();
  createMarkers();
})

var map;
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: -122.1479,
      lng: 47.5527
    },
    mapTypeId: google.maps.MapTypeId.MAP
  })
}

function initAutocomplete() {
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

function createMarkers(){
  console.log('my address',locations2);
  var infowindow = new google.maps.InfoWindow();
  var marker, j;
  for (j = 0; j < locations2.length; j++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations2[j].latitude, locations2[j].longitude),
      map: map
    });
    google.maps.event.addListener(marker, 'mouseover', (function (marker, j) {
      return function() {
        infowindow.setContent("<a href='/chores/" + locations2[j].id + "><p class='info'>" + locations2[j].title+ "</p></a>"+ "<p class='info'>" + "Pay: $" + locations2[j].rate + "</p>");
        infowindow.open(map, marker);
      }
    })(marker, j));
  }
}
