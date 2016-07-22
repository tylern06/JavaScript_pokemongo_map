var s2 = require('../');

var origin = new s2.S2CellId(new s2.S2LatLng(44.0378862, 10.0458712));

console.log(origin.parent(15).id());