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
    ObjectId       = require('mongodb').ObjectID,
    client         = require('../models/client'),
    submission     = require('../models/submission'),
    timesheet      = require('../models/timesheet'),
    User           = require('../models/user'),
    Payroll        = require('../models/payroll'),
    Banner         = require('../models/banner'),
    ticket         = require('../models/ticket'),
    alert          = require('../models/alert'),
    link           = require('../models/links'),
    serviceType    = require('../models/serviceType'),
    pdf            = require('../models/pdf'),
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
            alert.find({}, function (err, allAlerts) {
                link.find({}, function (err, allLinks) {
                    pdf.find({}, function (err, allPdfs) {
                        Banner.find({}, function (err, allBanners) {
            if (err) {
                console.log(err);
            } else {
                res.render("dashboard", { banners: allBanners, clients: allClients, submissions: allSubmissions, alerts: allAlerts, links: allLinks, pdfs: allPdfs });
            }
        })
        })
    })
    })
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

/** CLIENT ROUTES */
router.post('/clients', middleware.isLoggedIn, (req, res) => {
    var newClient = {
        clientName: req.body.clientName,
        author: req.body.author,
    };

    client.create(newClient, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/clients");
        }
    });
})

router.delete('/clients/:id', middleware.isLoggedIn, function (req, res) {
    client.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/clients');
        } else {
            res.redirect('/clients');
        }
    });
});

/** SUBMISSION ROUTES */
router.post('/submission', middleware.isLoggedIn, (req, res) => {
    var newSubmission = {
        submissionName: req.body.submissionName,
        author: req.body.author,
    };

    submission.create(newSubmission, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/submissions");
        }
    });
})

router.delete('/submission/:id', middleware.isLoggedIn, function (req, res) {
    submission.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/submissions');
        } else {
            res.redirect('/submissions');
        }
    });
});

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


/** USER ROUTES */
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
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
        })

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/dashboard');
        }
            res.redirect('/manage');
        });
    });

router.get('/edituser/:id', middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        client.find({}, function (err, allClients) {
            if (err) {
                console.log(err);
            } else {
                res.render("edituser", { user: foundUser, clients: allClients });
            }
        });
    });
});

router.put('/edituser/:id', middleware.isLoggedIn, function (req, res) {
    mongoose.connect(url, function (err, db) {
        if (err) throw err;
        var newvalues = { $set: {
            username: req.body.username, 
            cspid: req.body.cspid, 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            hireDate: req.body.hireDate, 
            phone: req.body.phone, 
            email: req.body.email, 
            cca: req.body.cca, 
            role: req.body.role,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
        }};
        db.collection("users").updateOne({ "_id": ObjectId(req.params.id) }, newvalues, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log('User Updated')
            }
        });
    })
    res.redirect('/manage');
});

router.delete('/edituser/:id', middleware.isLoggedIn, function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/manage');
        } else {
            res.redirect('/manage');
        }
    });
});

/** VIEW USER DETAILS */
router.get('/user/:id', middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        client.find({}, function (err, allClients) {
            if (err) {
                console.log(err);
            } else {
                res.render("user", { user: foundUser, clients: allClients });
            }
        });
    });
});

/** PAYROLL ROUTES */

router.get('/uploadpayroll', middleware.isLoggedIn, (req, res) => {
    User.find({}, function (err, allUsers) {
        timesheet.find({}, function (err, allTimesheets) {
            if (err) {
                console.log(err);
            } else {
                res.render("uploadpayroll", { users: allUsers, timesheets: allTimesheets });
            }
        })
    })
});

router.post('/uploadpayroll', uploadStorage.single("upload"), middleware.isLoggedIn, (req, res) => {
    var newPayroll = new Payroll({
        cspid: req.body.cspid,
        payperiod: req.body.payperiod,
        attachment: req.file.originalname,
    })

    Payroll.create(newPayroll, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/dashboard");
        }
    });
});

router.get('/viewpayroll', middleware.isLoggedIn, (req, res) => {
    User.find({}, function (err, allUsers) {
        Payroll.find({}, function (err, allPayrolls) {
            if (err) {
                console.log(err);
            } else {
                res.render("viewpayroll", { users: allUsers, payrolls: allPayrolls });
            }
        })
    })
});

/** TICKET ROUTES */

router.get('/ticketentry', middleware.isLoggedIn, (req, res) => {
    serviceType.find({}, function (err, allServiceTypes) {
        if (err) {
            console.log(err);
        } else {
            res.render("ticketentry", { serviceType: allServiceTypes });
        }
    })
});

router.get('/ticketreporting', middleware.isLoggedIn, (req, res) => {
    User.find({}, function (err, allUsers) {
        ticket.find({}, function (err, allTickets) {
            if (err) {
                console.log(err);
            } else {
                res.render("ticketreporting", { users: allUsers, tickets: allTickets });
            }
        })
    })
});

router.delete('/ticketreporting/:id', middleware.isLoggedIn, function (req, res) {
    ticket.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/ticketreporting');
        } else {
            res.redirect('/ticketreporting');
        }
    });
});

router.post('/ticketentry', uploadStorage.single("upload"), middleware.isLoggedIn, function (req, res) {
    if (req.file != undefined) {
        var newTicket = {
            cspid: req.body.cspid,
            date: req.body.dateofentry,
            time: req.body.timeofentry,
            serviceType: req.body.serviceType,
            additionalDetails: req.body.additionalDetails,
            ticketNumber: req.body.ticketNumber,
            adminresponse: req.body.adminresponse,
            attachment: req.file.originalname
        }
    } else {
        var newTicket = {
            cspid: req.body.cspid,
            date: req.body.dateofentry,
            time: req.body.timeofentry,
            serviceType: req.body.serviceType,
            additionalDetails: req.body.additionalDetails,
            ticketNumber: req.body.ticketNumber,
            adminresponse: req.body.adminresponse,
        }
    }

    ticket.create(newTicket, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/ticketentry");
        }
    });
});

router.get('/ticketview/:id', middleware.isLoggedIn, function (req, res) {
    ticket.findById(req.params.id, function (err, foundTicket) {
        User.find({}, function (err, allUsers) {
            if (err) {
                console.log(err);
            } else {
                res.render("ticketview", { ticket: foundTicket, users: allUsers });
            }
        });
    });
});

router.put('/ticketentry/:id', middleware.isLoggedIn, function (req, res) {
    mongoose.connect(url, function (err, db) {
        if (err) throw err;
        var newvalues = {
            $set: {
                adminresponse: req.body.adminresponse,
            }
        };
        db.collection("tickets").updateOne({ "_id": ObjectId(req.params.id) }, newvalues, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log('Ticket Updated')
            }
        });
    })
    res.redirect('/ticketreporting');
});

/** ALERTS */
router.get('/alerts', middleware.isLoggedIn, (req, res) => {
    alert.find({}, function (err, allAlerts) {
        if (err) {
            console.log(err);
        } else {
            res.render("alerts", { alerts: allAlerts });
        }
    })
})


router.post('/alerts', middleware.isLoggedIn, (req, res) => {
    var newAlert = new alert({
        alert: req.body.alert,
        priority: req.body.priority,
    })

    alert.create(newAlert, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/alerts");
        }
    });
});

router.delete('/alerts/:id', middleware.isLoggedIn, function (req, res) {
    alert.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/alerts');
        } else {
            res.redirect('/alerts');
        }
    });
});

/** LINKS */
router.get('/links', middleware.isLoggedIn, (req, res) => {
    link.find({}, function (err, allLinks) {
        if (err) {
            console.log(err);
        } else {
            res.render("links", { links: allLinks });
        }
    })
})


router.post('/links', middleware.isLoggedIn, (req, res) => {
    var newLink = new link({
        url: req.body.url,
        title: req.body.title,
    })

    link.create(newLink, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/links");
        }
    });
});

router.delete('/links/:id', middleware.isLoggedIn, function (req, res) {
    link.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/links');
        } else {
            res.redirect('/links');
        }
    });
});

/** PDF's */
router.get('/pdfs', middleware.isLoggedIn, (req, res) => {
    pdf.find({}, function (err, allPdfs) {
        if (err) {
            console.log(err);
        } else {
            res.render("pdfs", { pdfs: allPdfs });
        }
    })
})


router.post('/pdfs',uploadStorage.single("upload"), middleware.isLoggedIn, (req, res) => {
    var newPdf = new pdf({
        title: req.body.title,
        attachment: req.file.originalname,
    })

    pdf.create(newPdf, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/pdfs");
        }
    });
});

router.delete('/pdfs/:id', middleware.isLoggedIn, function (req, res) {
    pdf.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/pdfs');
        } else {
            res.redirect('/pdfs');
        }
    });
});

/** SERVICE TYPES */
router.post('/servicetype', middleware.isLoggedIn, (req, res) => {
    var newServiceType = {
        serviceType: req.body.name,
    };

    serviceType.create(newServiceType, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/servicetype");
        }
    });
})

router.delete('/servicetype/:id', middleware.isLoggedIn, function (req, res) {
    serviceType.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/servicetype');
        } else {
            res.redirect('/servicetype');
        }
    });
});

router.get('/servicetype', middleware.isLoggedIn, function (req, res) {
        serviceType.find({}, function (err, allServicetypes) {
            if (err) {
                console.log(err);
            } else {
                res.render("servicetype", { serviceType: allServicetypes });
            }
        })
});

/** CMS */
router.get('/candidates', middleware.isLoggedIn, function (req, res) {
    User.find({}, function (err, allUsers) {
        if (err) {
            console.log(err);
        } else {
            res.render("candidates", { Users: allUsers });
        }
    })
})

/** BANNER IMAGE  */
router.get('/banner', middleware.isLoggedIn, function (req, res) {
    Banner.find({}, function (err, allBanners) {
        if (err) {
            console.log(err);
        } else {
            res.render("banner", { Banners: allBanners });
        }
    })
})

router.post('/banner', uploadStorage.single("upload"), middleware.isLoggedIn, function (req, res) {
        var newBanner = {
            attachment: req.file.originalname
        }

    Banner.create(newBanner, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/banner");
        }
    });
});

router.delete('/banner/:id', middleware.isLoggedIn, function (req, res) {
    Banner.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/banner');
        } else {
            res.redirect('/banner');
        }
    });
});
module.exports = router;