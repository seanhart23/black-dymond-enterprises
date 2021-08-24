var mongoose = require("mongoose");

var sowSchema = mongoose.Schema({
    cspid: String,
    attachment: String,
    sowDate: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sow", sowSchema);