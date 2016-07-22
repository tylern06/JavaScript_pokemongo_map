var tweets = require("../controllers/tweets.js");
var pokemons = require("../controllers/pokemons.js");

module.exports = function(app){
	app.get('/tweets', function(req, res){
		tweets.index(req, res)
	})
	app.post('/pokemon', function(req,res){
		console.log('location in pokemon routes', req.body)
		pokemons.location(req,res)
	})
}
