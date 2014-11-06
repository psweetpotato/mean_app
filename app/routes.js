var User = require('./models/models').User;
var Best = require('./models/models').Best;

module.exports = function(app, passport) {

  app.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
  });

  app.get('/api/users', function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
        res.json(users);
    });
  });

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

  app.get('/api/bests', function(req, res) {
    Best.find(function(err, bests) {
      if (err)
        res.send(err);
        res.json(bests);
    });
  });
  app.post('/api/bests', function(req, res){
    console.log("routes best post");
      var best = new Best();
      best.name = req.body.name;
      best.lat = req.body.lat;
      best.lon = req.body.lon;
      best.address = req.body.address;
      best.category = req.body.category;
      best.category_id = req.body.category_id;
      best.venue_id = req.body.venue_id;
      best.user.push(req.user._id);
      best.save(function(err) {
        if (!err) {
          console.log("created");
          return res.send('');
        } else {
          console.log(err);
        };
      });
  });

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
  });

  app.put('/api/bests/:id', function(req, res) {
    Best.findById(req.params.id, function(err, best){
      if (err)
        res.send(err);
        best.name = req.body.name;
        // add all attributes to be updated
        best.save(function(err){
          if(err)
          res.send(err);
          res.json({message: 'updated!'});
        });
    });
  });

  app.delete('/api/bests/:id', function(req, res){
    Best.remove({_id: req.params.id}, function(err, best) {
      if (err)
        res.send(err);
        res.json({message: 'deleted!'});
    });
  });


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
      app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/map', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {
      console.log(req);
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage')});
    });

   // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/map', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });




  app.get('/map', function(req, res) {
    res.sendfile('./public/views/map.html');
    console.log(req.user._id);
  });
  app.get('/newuser', function(req, res) {
    res.sendfile('./public/views/user.html');
  });
  app.get('/newbest', function(req, res) {
    res.sendfile('./public/views/best.html');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};
