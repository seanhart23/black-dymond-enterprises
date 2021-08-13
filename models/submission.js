var mongoose = require("mongoose");

var submissionSchema = mongoose.Schema({
submissionName: String,
author: String,
created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", submissionSchema);