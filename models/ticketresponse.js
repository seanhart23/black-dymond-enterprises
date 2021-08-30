var mongoose = require("mongoose");

var ticketResponseSchema = mongoose.Schema({
    ticketId: String,
    comment: String,
    attachment: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TicketResponse", ticketResponseSchema);