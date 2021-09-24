
var date = moment().format("MMM Do, YYYY");

if (document.getElementById('date')){
    document.getElementById('date').innerText = date;
};

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
    $("#candidate_status").hide();
    $("#candidate_status_edit").hide();
}

hideFields();

var getForm = function(){
    var submissionType = document.getElementById('submission').value;
    if (submissionType === "Training"){
        $("#howWasClass").show(); 
        $("#cTime").show();
        $("#didYouAttend").show();
        $("#didYouVisit").show();
        $("#didYouVisit").change(function () {
            if (document.getElementById('visit').checked) {
                $("#didYouRecieve").show();
                $("#explainIssue").show();
                $("#upload").show();
                $("#recieve").change(function () {
                    if (document.getElementById('recieve').checked) {
                        $("#ticketNumber").show();
                    }
                })                
                $("#didnotrecieve").change(function () {
                    if (document.getElementById('didnotrecieve').checked) {
                        $("#ticketNumber").hide();
                    }
                })
            } else {
                $("#didYouRecieve").hide();
                $("#ticketNumber").hide();
                $("#explainIssue").hide();
                $("#upload").hide();
            }
        });
        $("#additionalInfo").show();
        $("#submit").show();
    } else if (submissionType === "Certification" || submissionType === "Production"){
        $("#timesheetHours").show();
        $("#totalHours").show();
        $("#didYouMiss").show();
            $("#missed").change(function () {
                if (document.getElementById('missed').checked) {
                    $("#explainWhy").show();
                }
            })
            $("#didntmiss").change(function () {
                if (document.getElementById('didntmiss').checked) {
                    $("#explainWhy").hide();
                }
            })
            $("#swap").show();
                $("#swapped").change(function () {
                    if (document.getElementById('swapped').checked) {
                        $("#swapGranted").show();
                    }
                })
                $("#notswapped").change(function () {
                    if (document.getElementById('notswapped').checked) {
                        $("#swapGranted").hide();
                    }
                })
        $("#release").show();
        $("#loginOnTime").show();
            $("#loggedinontime").change(function () {
                if (document.getElementById('loggedinontime').checked) {
                    $("#loginLateReason").hide();
                }
            })
            $("#notloggedinontime").change(function () {
                if (document.getElementById('notloggedinontime').checked) {
                    $("#loginLateReason").show();
                }
            })
        $("#logoutOnTime").show();
            $("#loggedoutontime").change(function () {
                if (document.getElementById('loggedoutontime').checked) {
                    $("#logoutLateReason").hide();
                }
            })
            $("#notloggedoutontime").change(function () {
                if (document.getElementById('notloggedoutontime').checked) {
                    $("#logoutLateReason").show();
                }
            })
        $("#didYouVisit").show();
        $("#didYouVisit").change(function () {
            if (document.getElementById('visit').checked) {
                $("#didYouRecieve").show();
                $("#explainIssue").show();
                $("#upload").show();
                $("#recieve").change(function () {
                    if (document.getElementById('recieve').checked) {
                        $("#ticketNumber").show();
                    }
                })
                $("#didnotrecieve").change(function () {
                    if (document.getElementById('didnotrecieve').checked) {
                        $("#ticketNumber").hide();
                    }
                })
            } else {
                $("#didYouRecieve").hide();
                $("#ticketNumber").hide();
                $("#explainIssue").hide();
                $("#upload").hide();
            }
        });
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
        $("#didYouVisit").change(function () {
            if (document.getElementById('visit').checked) {
                $("#didYouRecieve").show();
                $("#explainIssue").show();
                $("#upload").show();
                $("#recieve").change(function () {
                    if (document.getElementById('recieve').checked) {
                        $("#ticketNumber").show();
                    }
                })
                $("#didnotrecieve").change(function () {
                    if (document.getElementById('didnotrecieve').checked) {
                        $("#ticketNumber").hide();
                    }
                })
            } else {
                $("#didYouRecieve").hide();
                $("#ticketNumber").hide();
                $("#explainIssue").hide();
                $("#upload").hide();
            }
        });
        $("#additionalInfo").show();
        $("#submit").show();
    } else if (submissionType === "Missed DTS Submission (Certification/Production)") {
        $("#missedClassDate").show();
        $("#timesheetHours").show();
        $("#totalHours").show();
        $("#didYouMiss").show();
        $("#missed").change(function () {
            if (document.getElementById('missed').checked) {
                $("#explainWhy").show();
            }
        })
        $("#didntmiss").change(function () {
            if (document.getElementById('didntmiss').checked) {
                $("#explainWhy").hide();
            }
        })
        $("#swap").show();
        $("#swapped").change(function () {
            if (document.getElementById('swapped').checked) {
                $("#swapGranted").show();
            }
        })
        $("#notswapped").change(function () {
            if (document.getElementById('notswapped').checked) {
                $("#swapGranted").hide();
            }
        })
        $("#release").show();
        $("#loginOnTime").show();
        $("#loggedinontime").change(function () {
            if (document.getElementById('loggedinontime').checked) {
                $("#loginLateReason").hide();
            }
        })
        $("#notloggedinontime").change(function () {
            if (document.getElementById('notloggedinontime').checked) {
                $("#loginLateReason").show();
            }
        })
        $("#logoutOnTime").show();
        $("#loggedoutontime").change(function () {
            if (document.getElementById('loggedoutontime').checked) {
                $("#logoutLateReason").hide();
            }
        })
        $("#notloggedoutontime").change(function () {
            if (document.getElementById('notloggedoutontime').checked) {
                $("#logoutLateReason").show();
            }
        })
        $("#didYouVisit").show();
        $("#didYouVisit").change(function () {
            if (document.getElementById('visit').checked) {
                $("#didYouRecieve").show();
                $("#explainIssue").show();
                $("#upload").show();
                $("#recieve").change(function () {
                    if (document.getElementById('recieve').checked) {
                        $("#ticketNumber").show();
                    }
                })
                $("#didnotrecieve").change(function () {
                    if (document.getElementById('didnotrecieve').checked) {
                        $("#ticketNumber").hide();
                    }
                })
            } else {
                $("#didYouRecieve").hide();
                $("#ticketNumber").hide();
                $("#explainIssue").hide();
                $("#upload").hide();
            }
        });
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

$("#role").change(function () {
    var candidate_status = document.getElementById('role').value;
    if (candidate_status === "Candidate"){
        $('#candidate_status').show();
    } else {
        $('#candidate_status').hide();
    }
});

$("#role_edit").change(function () {
    var candidate_status = document.getElementById('role_edit').value;
    if (candidate_status === "Candidate") {
        $('#candidate_status_edit').show();
    } else {
        $('#candidate_status_edit').hide();
    }
});

$(function () {
    $('[data-toggle="popover"]').popover()
})

$('#submission-info').popover("html: true")

function adjustHeight(el) {
    el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight) + "px" : "60px";
}