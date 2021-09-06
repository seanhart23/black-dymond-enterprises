var mongoose = require('mongoose');

var ResetSchema = new mongoose.Schema({
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
    userId: String,
});

module.exports = mongoose.model('Reset', ResetSchema);