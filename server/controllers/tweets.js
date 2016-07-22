  var Twitter = require('twitter');

  //Get this data from your twitter apps dashboard
  // # my credentials
  // var client = new Twitter({
  //    consumer_key: "JKICZQnoCEKcWO0k4KcGM8EtT",
  //    consumer_secret: "p4pxv6Bk8KckRICpuemGHswYyFup4ndwJQIGfQRJQ7TLhxecVK",
  //    access_token_key: "146255719-PoQ1ICshZXHQzT2dc7Y69WieLoxpVIigVQIegysf",
  //    access_token_secret: "cZwujLFkUCb6syKTzAaoCPwdOLBwOFUKgc6BvnzT6cDQw"
  // });
  var client = new Twitter({
     consumer_key: "hQQqjt025EK0zMAsLcBdjQ7rU",
     consumer_secret: "MGhjYvHWUlWktGNypAmXMObde0Sa147zR35BrCkdAbznUj5Kid",
     access_token_key: "754053018337681408-wGledefiCVqda3XeMe0he73VtHy0L4c",
     access_token_secret: "iwoCtMvpCxLTcuieUNHMm2nVfDSKGOeiNZdheztOYhqYh"
  });

module.exports = {
  index: function(req, res){
    var params = { screen_name: 'PokemonGo_Map'}
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if(error){
        console.log(error);
      } else {
        res.json(tweets);
      }
    });
  }
}
