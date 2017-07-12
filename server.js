var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Superhero = require('./models/Superhero');
var mainRoutes = require('./routes/main');
var heroRoutes = require('./routes/superheroes');

var app = express();
var port= 3001;

mongoose.connect('mongodb://localhost/superheroes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use("/", mainRoutes);
app.use("/api/heroes", heroRoutes);

//links the html, css, and js files
app.use(express.static(__dirname + "/public"));

app.get('/api/heroes', function(req, res){

  Superhero.find(function( err, superheroes ){
    if(err){
      res.send(err)
    }else{
      res.json({data: superheroes, message: 'heroes successfully received'})
    }
  });
});
// req=object, parameter is a unique parameter (id, etc.,) the /:_id= find by id
app.get('/api/heroes/:_id', function(req,res){
  Superhero.findById(req.params._id, function(err, superhero){
    if(err){
      res.send(err)
    }else{
      res.json({data: superhero, message: "hero received"});
    }
  })
})



app.post('/api/heroes', function(req, res) {
  console.log("Hitting post route")
  var superhero = new Superhero();
  superhero.name = req.body.name;
  superhero.superpower = req.body.superpower;
  superhero.img = req.body.img;

  superhero.save().then(function(superhero) {
    res.json({message: "Hero successfully created", data: superhero});
  }, function(err) {
    res.send("Failed to save :( ")
  })
});

app.delete('/api/heroes/:_id', function(req,res){

Superhero.remove({ _id: req.params._id }, function(err){
  if(err){
    res.send(err)
  }else{
    res.send("Superhero deleted.")
  }
})

})









var server = app.listen(port, function(){
  console.log("Listening on port:", port);
})
