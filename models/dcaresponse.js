var mongoose = require("mongoose");

var dcaResponseSchema = mongoose.Schema({
    dcaId: String,
    comment: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DcaResponse", dcaResponseSchema);