// 'use strict';
'use strict';

module.exports = {
  location: function(req, res){
    // console.log('im in pokemon controller',req.body)
    // pokeAPI(req.body.lat,req.body.lon);
  }
}

function pokeAPI (lat,lon){
    // console.log('lat', lat);
    var PokemonGO = require('pokemon-go-node-api/poke.io');
    // using var so you can login with multiple users
    var a = new PokemonGO.Pokeio()
    var b = new PokemonGO.Pokeio()

    //Set environment variables or replace placeholder text
    var location1 = {
        type: 'coords',
        coords: {latitude:47.60976, longitude:-122.1966}
    };

    // var location1 = {
    //     type: 'name',
    //     name: process.env.PGO_LOCATION || 'Seattle'
    // };

    var username1 = process.env.PGO_USERNAME || 'ditto206';
    var password1 = process.env.PGO_PASSWORD || 'pikachu';
    var provider1 = process.env.PGO_PROVIDER || 'ptc';

    // var username1 = process.env.PGO_USERNAME || 'USER';
    // var password1 = process.env.PGO_PASSWORD || 'PASS';
    // var provider1 = process.env.PGO_PROVIDER || 'google';
    b.init(username1, password1, location1, provider1, function(err) {
    if (err) throw err;

    console.log('[i] Current location: ' + b.playerInfo.locationName);
    console.log('[i] lat/long/alt: : ' + b.playerInfo.latitude + ' ' + b.playerInfo.longitude + ' ' + b.playerInfo.altitude);

    b.GetProfile(function(err, profile) {
        if (err) throw err;

        console.log('[i] Username: ' + profile.username);
        console.log('[i] Poke Storage: ' + profile.poke_storage);
        console.log('[i] Item Storage: ' + profile.item_storage);

        var poke = 0;
        if (profile.currency[0].amount) {
            poke = profile.currency[0].amount;
        }

        console.log('[i] Pokecoin: ' + poke);
        console.log('[i] Stardust: ' + profile.currency[1].amount);

        setInterval(function(){
            b.Heartbeat(function(err,hb) {
                if(err) {
                    console.log(err);
                }
                // console.log('hb', hb)

                for (var i = hb.cells.length - 1; i >= 0; i--) {
                    if(hb.cells[i].NearbyPokemon[0]) {
                        // console.log('pokemon list', b.pokemonlist[1])
                        var pokemon = b.pokemonlist[parseInt(hb.cells[i].NearbyPokemon[0].PokedexNumber)-1]
                        console.log('[+] There is a ' + pokemon.name + ' at ' + hb.cells[i].NearbyPokemon[0].DistanceMeters.toString() + ' meters')
                    }
                }

                // Show WildPokemons (catchable) & catch
                // for (var j = hb.cells[i].WildPokemon.length - 1; j >= 0; j--)
                // {   // use async lib with each or eachSeries should be better :)
                //     var currentPokemon = hb.cells[i].WildPokemon[j];
                //     var pokedexInfo = b.pokemonlist[parseInt(currentPokemon.pokemon.PokemonId)-1]
                //     console.log('[+] There is a ' + pokedexInfo.name + ' near!! I can try to catch it!');
                    
                //     Pokeio.EncounterPokemon(currentPokemon, function(suc, dat) {
                //         console.log('Encountering pokemon ' + pokedexInfo.name + '...');
                //         Pokeio.CatchPokemon(currentPokemon, 1, 1.950, 1, 1, function(xsuc, xdat) {
                //             var status = ['Unexpected error', 'Successful catch', 'Catch Escape', 'Catch Flee', 'Missed Catch'];
                //             console.log(status[xdat.Status]);
                //         });
                //     });
                // }

            });
        }, 5000);

    });
});


}



