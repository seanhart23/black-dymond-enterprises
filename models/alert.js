var mongoose = require("mongoose");

var alertSchema = mongoose.Schema({
    alert: String,
    priority: String,
    author: String,
created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);