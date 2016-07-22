var	myAppModule = angular.module('myApp', ['ngRoute', 'angularMoment']);
myAppModule.config(function ($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl: 'static/partials/tweets.html'
		// })
		// .otherwise({
		// 	redirectTo: '/'
		});
});
