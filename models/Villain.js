var mongoose = require('mongoose');
var VillainSchema = new mongoose.Schema({
  name: String,
  evilPower: String,
  img: String,
})

module.exports = mongoose.model('Villain', VillainSchema);
//^^^^^ using this allows us to just use Villain instead of Schema all the time
