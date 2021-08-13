var mongoose = require("mongoose");

var timesheetSchema = mongoose.Schema({
    cspid: String,
    client: String,
    submission: String,
    howWasClass: String,
    classTime: String,
    attend: String,
    visit: String,
    recieveTicket: String,
    ticketNumber: String,
    explainIssue: String,
    upload: String,
    additionalInfo: String,
    employeeName: String,
    author: String,
    totalHours: String,
    didYouMiss: String,
    explainWhy: String,
    swap: String,
    swapGranted: String,
    didYouRelease: String,
    loginOnTime: String,
    logoutOnTime: String,
    logoutReason: String,
    reason: String,
    urgent: String,
    validation: String,
    missedClassDate: String,
    timesheetHours: Array,
    attachment: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Timesheet", timesheetSchema);