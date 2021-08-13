var express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    multer         = require('multer'),
    methodOverride = require('method-override'),
    GridFsStorage  = require('multer-gridfs-storage'),
    middleware     = require('../middleware'),
    app            = express(),
    request        = require('request'),
    moment         = require('moment'),
    bodyParser     = require('body-parser'),
    passport       = require('passport'),
    mongoose       = require('mongoose'),
    client         = require('../models/client'),
    submission     = require('../models/submission'),
    timesheet      = require('../models/timesheet'),
    User           = require('../models/user'),
    url            = "mongodb+srv://sean:admin@black-dymond-enterprise.bxkyr.mongodb.net/black-dymond-enterprises?retryWrites=true&w=majority"
    connect        = mongoose.createConnection(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }),
    connection     = mongoose.connect("mongodb+srv://sean:admin@black-dymond-enterprise.bxkyr.mongodb.net/black-dymond-enterprises?retryWrites=true&w=majority", { useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const uploadStorage = multer({ storage: storage })
router.get('/', function (req, res) {
    res.render("login");
})

/** ADMIN ROUTES */
router.get('/dashboard', middleware.isLoggedIn, function (req, res) {
    client.find({}, function (err, allClients) {
        submission.find({}, function (err, allSubmissions) {
            if (err) {
                console.log(err);
            } else {
                res.render("dashboard", { clients: allClients, submissions: allSubmissions });
            }
        })
    })
});

router.get('/manage', middleware.isLoggedIn, function (req, res) {
    User.find({}, function (err, allUsers) {
            if (err) {
                console.log(err);
            } else {
                res.render("manage", { Users: allUsers });
            }
        })
    })


router.get('/clients', middleware.isLoggedIn, function (req, res) {
    client.find({}, function (err, allClients) {
        submission.find({}, function (err, allSubmissions) {
            if (err) {
                console.log(err);
            } else {
                res.render("clients", { clients: allClients, submissions: allSubmissions });
            }
        })
    })
});

router.get('/submissions', middleware.isLoggedIn, function (req, res) {
    client.find({}, function (err, allClients) {
        submission.find({}, function (err, allSubmissions) {
            if (err) {
                console.log(err);
            } else {
                res.render("submissions", { clients: allClients, submissions: allSubmissions });
            }
        })
    })
});

router.get('/register', middleware.isLoggedIn, function (req, res) {
    client.find({}, function (err, allClients) {
        if (err) {
            console.log(err);
        } else {
            res.render("register", {clients: allClients});
        }
    })
})

router.get('/login', function (req, res) {
    res.render("login");
})

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/dashboard',
        failureRedirect: 'login'
    }), 
    function (req, res) {
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('login');
});

router.post('/clients', middleware.isLoggedIn, (req, res) => {
    var newClient = {
        clientName: req.body.clientName,
        author: req.body.author,
    };

    client.create(newClient, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/dashboard");
        }
    });
})

router.post('/submission', middleware.isLoggedIn, (req, res) => {
    var newSubmission = {
        submissionName: req.body.submissionName,
        author: req.body.author,
    };

    submission.create(newSubmission, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/dashboard");
        }
    });
})

/** TIMESHEET ROUTES */
router.get('/timesheets', middleware.isLoggedIn, function (req, res) {
    client.find({}, function (err, allClients) {
        submission.find({}, function (err, allSubmissions) {
            if (err) {
                console.log(err);
            } else {
                res.render("timesheet", { clients: allClients, submissions: allSubmissions });
            }
        })
    })
});

router.get('/timesheetreporting', middleware.isLoggedIn, function (req, res) {
    User.find({}, function (err, allUsers) {
        timesheet.find({}, function (err, allTimesheets) {
            if (err) {
                console.log(err);
            } else {
                res.render("timesheetreporting", { users: allUsers, timesheets: allTimesheets });
            }
        })
    })
});

router.get('/timesheetview/:id', middleware.isLoggedIn, function (req, res) {
    timesheet.findById(req.params.id, function (err, foundTimesheet) {
        User.find({}, function (err, allUsers) {
            if (err) {
                console.log(err);
            } else {
                res.render("timesheetview", { timesheet: foundTimesheet, users: allUsers });
            }
        });
    });
});

router.delete('/timesheet/:id', middleware.isLoggedIn, function (req, res) {
    timesheet.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/timesheetreporting');
        } else {
            res.redirect('/timesheetreporting');
        }
    });
});

router.post('/timesheets', uploadStorage.single("upload"), middleware.isLoggedIn, function (req, res) {
    if (req.file != undefined) {
        var newTimesheet = {
            cspid: req.body.cspid,
            client: req.body.client,
            submission: req.body.submission,
            howWasClass: req.body.howWasClass,
            classTime: req.body.classTime,
            attend: req.body.attend,
            visit: req.body.visit,
            recieveTicket: req.body.recieveTicket,
            ticketNumber: req.body.ticketNumber,
            explainIssue: req.body.explainIssue,
            upload: req.body.upload,
            additionalInfo: req.body.additionalInfo,
            employeeName: req.body.author,
            totalHours: req.body.totalHours,
            didYouMiss: req.body.didYouMiss,
            explainWhy: req.body.explainWhy,
            swap: req.body.swap,
            swapGranted: req.body.swapGranted,
            didYouRelease: req.body.didYouRelease,
            loginOnTime: req.body.loginOnTime,
            reason: req.body.reason,
            logoutOnTime: req.body.logoutOnTime,
            logoutReason: req.body.logoutReason,
            urgent: req.body.urgent,
            validation: req.body.validation,
            missedClassDate: req.body.missedClassDate,
            timesheetHours: req.body.timesheetHours,
            attachment: req.file.originalname
        }
    } else {
        var newTimesheet = {
            cspid: req.body.cspid,
            client: req.body.client,
            submission: req.body.submission,
            howWasClass: req.body.howWasClass,
            classTime: req.body.classTime,
            attend: req.body.attend,
            visit: req.body.visit,
            recieveTicket: req.body.recieveTicket,
            ticketNumber: req.body.ticketNumber,
            explainIssue: req.body.explainIssue,
            upload: req.body.upload,
            additionalInfo: req.body.additionalInfo,
            employeeName: req.body.author,
            totalHours: req.body.totalHours,
            didYouMiss: req.body.didYouMiss,
            explainWhy: req.body.explainWhy,
            swap: req.body.swap,
            swapGranted: req.body.swapGranted,
            didYouRelease: req.body.didYouRelease,
            loginOnTime: req.body.loginOnTime,
            reason: req.body.reason,
            logoutOnTime: req.body.logoutOnTime,
            logoutReason: req.body.logoutReason,
            urgent: req.body.urgent,
            validation: req.body.validation,
            missedClassDate: req.body.missedClassDate,
            timesheetHours: req.body.timesheetHours,
        }
    }

    timesheet.create(newTimesheet, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/timesheets");
        }
    });
});


router.post('/register', middleware.isLoggedIn, (req, res) => {
    var newUser = new User({
            username: req.body.username,
            cspid: req.body.cspid,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            hireDate: req.body.hireDate,
            phone: req.body.phone,
            email: req.body.email,
            client: req.body.client,
            cca: req.body.cca,
            role: req.body.role,
        })

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/dashboard');
        }
            res.redirect('/manage');
        });
    });


module.exports = router;