var mongoose = require("mongoose");

var linkSchema = mongoose.Schema({
    url: String,
    title: String,
    author: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Link", linkSchema);