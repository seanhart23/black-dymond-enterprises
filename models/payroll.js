var mongoose = require("mongoose");

var payrollSchema = mongoose.Schema({
    cspid: String,
    attachment: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payroll", payrollSchema);