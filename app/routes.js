// grab the user model we just created

var User = require('./models/models').User;
var Best = require('./models/models').Best;


    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.use(function(req, res, next) {
            console.log('Something is happening.');
            next(); // make sure we go to the next routes and don't stop here
        });

        // sample api route
        app.get('/api/users', function(req, res) {
            // use mongoose to get all users in the database
            User.find(function(err, users) {
                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                res.json(users); // return all users in JSON format
            });
        });
        // route to handle creating
        app.post('/api/users', function(req, res){
            console.log('routes post');
            var user = new User();
            user.id = req.id;
            user.name = req.name;
            user.email = req.email;
            console.log(user.name);
            user.save(function(err) {
                if (err)
                res.send(err);
                res.json({ message: 'User created!' });
            });
        });
        // route to handle deleting
        app.delete('/api/users', function(req, res){
            User.delete(function(err){
                // add deleting code here
            });
        });

         //api routes for bests

         app.get('/api/bests', function(req, res) {
            Best.find(function(err, bests) {
                 if (err)
                     res.send(err);
                 res.json(bests);
             });
         });
         app.post('/api/bests', function(req, res){
             var best = new Best();
             best.name = req.name;
             best.lat = req.lat;
             best.lon = req.lon;
             best.address = req.address;
             best.user = req.user;
             best.save(function(err) {
                 if (err)
                 res.send(err);
                 res.json({ message: 'Best created!' });
             });
         });
         app.delete('/api/bests', function(req, res){
             Best.delete(function(err){
                 // add delete code
             });
         });


        // frontend routes =========================================================
        // route to handle all angular requests


        app.get('/index', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });
        app.get('/newuser', function(req, res) {
            res.sendfile('./public/views/user.html'); // load our public/user.html file
        });
        app.get('/newbest', function(req, res) {
            res.sendfile('./public/views/best.html'); // load our public/user.html file
        });


};
