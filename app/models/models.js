var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  local: {
    id: ObjectId,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  // bests: [{type: Number, ref: 'Best'}]
    bests: {
      Bagels:String,
      Brunch:String,
      Burger:String,
      Coffee:String,
      Dessert:String,
      Doughnuts:String,
      IceCream:String,
      Pizza:String,
      Ramen:String,
      Sushi:String,
      Tacos:String
    }
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
