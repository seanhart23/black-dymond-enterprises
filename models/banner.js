var mongoose = require("mongoose");

var bannerSchema = mongoose.Schema({
    title: String,
    content: String,
    attachment: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Banner", bannerSchema);