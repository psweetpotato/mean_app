var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  local: {
  id: ObjectId,
  email: String,
  password: String,
  bests : [{type: mongoose.Schema.ObjectId, ref: 'Best'}]
}
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

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var Best = mongoose.model('Best', bestSchema);
var User = mongoose.model('User', userSchema);
module.exports = {
  Best: Best,
  User: User
}
