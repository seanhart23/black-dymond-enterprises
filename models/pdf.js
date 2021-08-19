var mongoose = require("mongoose");

var pdfSchema = mongoose.Schema({
    title: String,
    attachment: String,
    author: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pdf", pdfSchema);