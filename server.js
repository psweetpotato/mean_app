// modules =================================================
var express        = require('express');
var flash          = require('connect-flash');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var morgan         = require('morgan');

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
mongoose.connect(db.url);
app.use(morgan('dev')); // log every request to the console


// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// compling sass into css
// var srcPath = __dirname + '/public/sass';
// var destPath = __dirname + '/public/styles';
// app.use(
//   sassMiddleware({
//       src: srcPath
//     , dest: destPath
//     , debug: true
//     , outputStyle: 'compressed'
//     , prefix: '/styles'
//   }));
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// start app ===============================================
// startup our app at http://localhost:8080

// configure passport
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(cookieParser());
app.use(session({ secret: 'potatosweet', saveUninitialized: true, resave: true, cookie: { maxAge : 1200000 } })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
// routes ==================================================
require('./app/routes')(app, passport); // configure our routes
require('./config/passport')(passport); // pass passport for configuration

// expose app
exports = module.exports = app;


app.listen(port);
console.log('Magic happens on port ' + port);


