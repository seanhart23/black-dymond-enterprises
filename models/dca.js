var mongoose = require("mongoose");

var DcaSchema = mongoose.Schema({
    type: String,
    preference: String,
    cspid: String,
    comment: String,
    status: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Dca", DcaSchema);