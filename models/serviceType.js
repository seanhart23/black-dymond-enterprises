var mongoose = require("mongoose");

var serviceTypeSchema = mongoose.Schema({
serviceType: String,
author: String,
created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ServiceType", serviceTypeSchema);