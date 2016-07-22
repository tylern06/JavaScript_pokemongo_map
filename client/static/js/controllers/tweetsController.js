myAppModule.controller('tweetsController', function ($scope, tweetsFactory){
	var location = [47.5527, -122.1479];

	tweetsFactory.getTweets(function(data){
    console.log(data)
		$scope.tweets = data
	  initMap();
	  initAutocomplete();
	  createMarkers();
	})

	tweetsFactory.getCurrentLocation(function(data){
		$scope.longitude = data.lon
		$scope.latitude = data.lat
		console.log($scope.longitude, $scope.latitude)
	})

	var map;
	function initMap(){
		console.log($scope.latitude, $scope.longitude)
	  map = new google.maps.Map(document.getElementById('display_map'), {
	    zoom: 10,
	    center: {
	      lat: $scope.latitude,
	      lng: $scope.longitude
	    },
	    mapTypeId: google.maps.MapTypeId.MAP
	  })
	}

	function createMarkers(){
	  var infowindow = new google.maps.InfoWindow();
	  var marker, j;
	  for (j = 0; j < $scope.tweets.length; j++) {
			if ($scope.tweets[j].place != null) {
				marker = new google.maps.Marker({
					position: new google.maps.LatLng($scope.tweets[j].place.bounding_box.coordinates[0][0][1], $scope.tweets[j].place.bounding_box.coordinates[0][0][0]),
					map: map
				});
				google.maps.event.addListener(marker, 'mouseover', (function (marker, j) {
					return function() {
						infowindow.setContent("<p class='info'>" + $scope.tweets[j].id + "</p>");
						infowindow.open(map, marker);
					}
				})(marker, j));
			}
	  }
	}

	function initAutocomplete(){
	  // Create the search box and link it to the UI element.
	  var input = document.getElementById('pac-input');
		// if (input == null || input == ''){
		// 	input = 'Seattle';
		// }
		// console.log(input)
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
})
