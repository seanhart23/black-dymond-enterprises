var date = moment().format("MMM Do, YYYY");

document.getElementById('date').innerText = date;
var hideFields = function(){
    $("#howWasClass").hide();
    $("#cTime").hide();
    $("#didYouAttend").hide();
    $("#didYouVisit").hide();
    $("#didYouRecieve").hide();
    $("#ticketNumber").hide();
    $("#explainIssue").hide();
    $("#missedClassDate").hide();
    $("#explainWhy").hide();
    $("#urgent").hide();
    $("#upload").hide();
    $("#additionalInfo").hide();
    $("#submit").hide();
    $("#timesheetHours").hide();
    $("#totalHours").hide();
    $("#didYouMiss").hide();
    $("#swap").hide();
    $("#swapGranted").hide();
    $("#release").hide();
    $("#loginOnTime").hide();
    $("#loginLateReason").hide();
    $("#logoutOnTime").hide();
    $("#logoutLateReason").hide();
    $("#additionalNotes").hide();
    $("#validation").hide();
}

hideFields();

var getForm = function(){
    var submissionType = document.getElementById('submission').value;
    if (submissionType === "Training"){
        $("#howWasClass").show(); 
        $("#cTime").show();
        $("#didYouAttend").show();
        $("#didYouVisit").show();
        $("#didYouRecieve").show();
        $("#ticketNumber").show();
        $("#explainIssue").show();
        $("#upload").show();
        $("#additionalInfo").show();
        $("#submit").show();
    } else if (submissionType === "Certification" || submissionType === "Production"){
        $("#timesheetHours").show();
        $("#totalHours").show();
        $("#didYouMiss").show();
        $("#explainWhy").show();
        $("#swap").show();
        $("#swapGranted").show();
        $("#release").show();
        $("#loginOnTime").show();
        $("#loginLateReason").show();
        $("#logoutOnTime").show();
        $("#logoutLateReason").show();
        $("#didYouVisit").show();
        $("#didYouRecieve").show();
        $("#ticketNumber").show();
        $("#explainIssue").show();
        $("#upload").show();
        $("#additionalNotes").show();
        $("#validation").show();
        $("#submit").show();
    } else if (submissionType === "Off Day") {
        $("#urgent").show();
        $("#submit").show();
    } else if (submissionType === "Urgent Service Hours/Intervals") {
        $("#timesheetHours").show();
        $("#totalHours").show();
        $("#validation").show();
        $("#submit").show();
    } else if (submissionType === "Missed DTS Submission (Training)") {
        $("#missedClassDate").show();
        $("#howWasClass").show();
        $("#cTime").show();
        $("#didYouAttend").show();
        $("#didYouVisit").show();
        $("#didYouRecieve").show();
        $("#ticketNumber").show();
        $("#explainIssue").show();
        $("#upload").show();
        $("#additionalInfo").show();
        $("#submit").show();
    } else if (submissionType === "Missed DTS Submission (Certification/Production)") {
        $("#missedClassDate").show();
        $("#timesheetHours").show();
        $("#totalHours").show();
        $("#didYouMiss").show();
        $("#explainWhy").show();
        $("#swap").show();
        $("#swapGranted").show();
        $("#release").show();
        $("#loginOnTime").show();
        $("#loginLateReason").show();
        $("#logoutOnTime").show();
        $("#logoutLateReason").show();
        $("#didYouVisit").show();
        $("#didYouRecieve").show();
        $("#ticketNumber").show();
        $("#explainIssue").show();
        $("#upload").show();
        $("#additionalNotes").show();
        $("#validation").show();
        $("#submit").show();
    } else {
        console.log("Submission Type not found")
    }
}

$("#submission").change(function () {
    hideFields();
    getForm();
});

$(function () {
    $('[data-toggle="popover"]').popover()
})

$('#submission-info').popover("html: true")

// Data Picker Initialization
// $('.datepicker').datepicker();


