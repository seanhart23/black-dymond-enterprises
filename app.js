var express        = require('express'),
    request        = require("express"),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    request        = require('request'),
    mongoose       = require('mongoose'),
    app            = express(),
    moment         = require('moment'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    LocalStrategy  = require('passport-local'),
    User           = require('./models/user'),
    router         = express.Router();

mongoose.set('useFindAndModify', false);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
    secret: 'I am cool',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/** ROUTES */
var indexRoutes = require('./routes/index.js');

/** REQUIRING ROUTE FILES USING EXPRESS ROUTER */
app.use('/', indexRoutes);

/** TELL APP TO LISTEN TO PORT AND IP */
app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("================================");
    console.log("The Time Tracker server has started!");
    console.log("================================");
});