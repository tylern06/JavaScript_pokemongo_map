myAppModule.factory('tweetsFactory', function($http){
  var tweets = [];
  var factory = {};
 
  factory.getTweets = function(callback) {
    // console.log("I am in factory");
    $http.get('/tweets').success(function(tweets) {
      callback(tweets);
    })
  }

  factory.getCurrentLocation = function(callback) {
    $http.get('http://ip-api.com/json').success(function(data){
      callback(data);
      $http.post('/pokemon', data).success(function(output){
        
      })
    })
  }

  return factory;
});
