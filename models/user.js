var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    cspid: String,
    firstName: String,
    lastName: String,
    hireDate: String,
    phone: String,
    email: String,
    client: String,
    cca: String,
    role: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    notes: String,
    status: String,
    classification: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);