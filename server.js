var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Superhero = require('./models/Superhero');
//var mainRoutes = require('./routes/main');
var heroRoutes = require('./routes/superheroes');
var villainRoutes = require('./routes/villains');
var Villain = require('./models/Villain');
var app = express();
var port= 3001;

mongoose.connect('mongodb://localhost/superheroes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
//app.use("/api/main", mainRoutes);
app.use("/api/heroes", heroRoutes);

//links the html, css, and js files
app.use(express.static(__dirname + "/public"));


app.use("/api/villains", villainRoutes);
// req=object, parameter is a unique parameter (id, etc.,) the /:_id= find by id

var server = app.listen(port, function(){
  console.log("Listening on port:", port);
});
