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
    upload         = require("./routes/upload"),
    Grid           = require("gridfs-stream"),
    router         = express.Router(),
    connection = mongoose.connect("mongodb+srv://amber:Dymond100!@black-dymond-enterprise.bxkyr.mongodb.net/black-dymond-enterprises?retryWrites=true&w=majority", { useUnifiedTopology: true });


let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});
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

app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

/** REQUIRING ROUTE FILES USING EXPRESS ROUTER */
app.use('/', indexRoutes);
app.use("/file", upload);

/** TELL APP TO LISTEN TO PORT AND IP */
app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("================================");
    console.log("The Time Tracker server has started!");
    console.log("================================");
});