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
            user.name = req.body.name;
            user.email = req.body.email;
            console.log(req.body.name);
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
         })

        app.post('/api/bests', function(req, res){
            console.log("routes best post");
             var best = new Best();
             best.name = req.body.name;
             best.lat = req.body.lat;
             best.lon = req.body.lon;
             best.address = req.body.address;
             best.user.push("544e939a59630d151c7b59d4"); //FIXME currently hardcoded
             best.save(function(err) {
                 if (err)
                 res.send(err);
                 res.json({ message: 'Best created!' });
             });
         })

        app.delete('/api/bests', function(req, res){
            console.log("app.delete");
             Best.remove(function (err) {
                if (!err) {
                console.log("removed");
                return res.send('');
                } else {
                console.log(err);
                }
            });
         });

        app.get('/api/bests/:id', function(req, res) {
            Best.findById(req.params.id, function(err, best) {
                console.log(req.params.id);
            if (err)
                res.send(err);
            res.json(best);
        });

        app.delete('/api/bests/:id', function(req, res){
            Best.remove({_id: req.params.id}, function(err, best) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
            });
        })
        // frontend routes =========================================================
        // route to handle all angular requests
});
        app.get('/index', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });
        app.get('/newuser', function(req, res) {
            res.sendfile('./public/views/user.html'); // load our public/user.html file
        });
        app.get('/newbest', function(req, res) {
            res.sendfile('./public/views/best.html'); // load our public/best.html file
        });

        };
