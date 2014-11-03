var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  bests : [{type: mongoose.Schema.ObjectId, ref: 'Best'}]
});

var bestSchema = mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number,
  address: String,
  category: String,
  category_id: Number,
  venue_id: String,
  user : [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

var Best = mongoose.model('Best', bestSchema);
var User = mongoose.model('User', userSchema);
module.exports = {
  Best: Best,
  User: User
}
