var express = require('express');
var Router = express.Router();
var Superhero = require('../models/Superhero');

Router.route("/").get(function(req,res){
  Superhero.find(function(err, superheroes){
    if(err){
      res.send(err)
    }else{
      res.json({data: superheroes});
    }
  });
}).post(function(req,res){
  console.log("Hitting Post Route");
  var superhero = new Superhero();
  superhero.name = req.body.name;
  superhero.superpower = req.body.superhero;
  superhero.img = req.body.img;

  superhero.save().then(function(superhero){
    res.json({message: "Superhero successfully created", data: superhero});
  }, function(err){
    res.send(err);
  })
})

Router.route("/:_id").get(function(req,res){
  Superhero.findById(req.params._id, function(err, superhero){
    if(err){
      res.send(err);
    }else{
      res.json({message:"Superhero Received", data: superhero});
    }
  });
}).remove({ _id: req.params._id }, function(err){
    if(err){
    res.send(err)
    }else{
    res.send("Superhero deleted.")
    }
  });


module.exports = Router;
