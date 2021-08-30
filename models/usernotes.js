var mongoose = require("mongoose");

var userNoteSchema = mongoose.Schema({
    userId: String,
    comment: String,
    attachment: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("userNote", userNoteSchema);