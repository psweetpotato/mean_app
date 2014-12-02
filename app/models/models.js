var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  local: {
  id: ObjectId,
  email: {type: String, unique: true},
  password: String,
  following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  bests: [{type: Number, ref: 'Best'}]
  // bests: [
  //     {Bagels: {type: String, ref: 'Best'}},
  //     {Brunch: {type: String, ref: 'Best'}},
  //     {Burger: {type: String, ref: 'Best'}},
  //     {Coffee: {type: String, ref: 'Best'}},
  //     {Dessert: {type: String, ref: 'Best'}},
  //     {Doughnuts: {type: String, ref: 'Best'}},
  //     {IceCream: {type: String, ref: 'Best'}},
  //     {Pizza: {type: String, ref: 'Best'}},
  //     {Ramen: {type: String, ref: 'Best'}},
  //     {Sushi: {type: String, ref: 'Best'}},
  //     {Tacos: {type: String, ref: 'Best'}}
  // ]
  }
});

var bestSchema = mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number,
  address: String,
  category: String,
  venue_id: String,
  user : [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var Best = mongoose.model('Best', bestSchema);
var User = mongoose.model('User', userSchema);
module.exports = {
  Best: Best,
  User: User
}
