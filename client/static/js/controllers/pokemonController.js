myAppModule.controller('pokemonController', function ($scope, tweetsFactory){

		tweetsFactory.getCurrentLocation(function(data){
		$scope.longitude = data.lon
		$scope.latitude = data.lat
		console.log($scope.longitude, $scope.latitude)
	})

}
