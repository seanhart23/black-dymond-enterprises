var mongoose = require("mongoose");

var ticketSchema = mongoose.Schema({
    cspid: String,
    date: String,
    time: String,
    serviceType: String,
    additionalDetails: String,
    ticketNumber: String,
    attachment: String,
    adminresponse: String,
    status: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", ticketSchema);