var mongoose = require("mongoose");

var bannerSchema = mongoose.Schema({
    attachment: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Banner", bannerSchema);