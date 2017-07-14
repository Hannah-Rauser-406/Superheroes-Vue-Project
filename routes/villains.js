var express = require('express');
var Router = express.Router();
var Villain = require('../models/Villain');

Router.route("/").get(function(req,res){
  Villain.find(function(err, villains){
    if(err){
      res.send(err)
    }else{
      res.json({data: villains});
    }
  });
}).post(function(req,res){
  console.log("Hitting Post Route");
  var villain = new Villain();
  villain.name = req.body.name;
  villain.superpower = req.body.evilPower;
  villain.img = req.body.img;

  villain.save().then(function(villain){
    res.json({message: "Villain successfully created", data: villain});
  }, function(err){
    res.send(err);
  })
})

Router.route("/:_id").get(function(req,res){
  Villain.findById(req.params._id, function(err, superhero){
    if(err){
      res.send(err);
    }else{
      res.json({message:"Villain Received", data: villain});
    }
  });
}).delete(function(req,res){

 Villain.remove({_id: req.params._id}, function(err){
    if(err){
      res.send(err);
    }else{
      res.send("Villain deleted.");
    }
  });
});


module.exports = Router;
