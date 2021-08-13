var mongoose = require("mongoose");

var clientSchema = mongoose.Schema({
    clientName: String,
    author: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Client", clientSchema);