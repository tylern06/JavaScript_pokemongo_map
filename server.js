
var express = require("express");
var app = express();
var path = require("path");
var bodyParser= require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "./node_modules")));
app.use(express.static(path.join(__dirname, "./client")));

// require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

port = 8000;
var server = app.listen(port, function(){
	console.log("********** PORT " + port + " PORT **********")
});
