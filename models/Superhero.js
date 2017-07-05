var mongoose = require('mongoose');
var SuperheroSchema = new mongoose.Schema({
//using constructor notation/function
  name: String,
  superpower: String,

})

//allows us to access our SuperheroSchema AS just Superhero
module.exports = mongoose.model('Superhero', SuperheroSchema);
