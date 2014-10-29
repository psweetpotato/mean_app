var User = require('./models/models').User;
var Best = require('./models/models').Best;
  module.exports = function(app) {

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
      best.user.push("544e939a59630d151c7b59d4"); //FIXME currently hardcoded
      best.save(function(err) {
        if (err)
          res.send(err);
          res.json({ message: 'Best created!' });
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
        res.json({ message: 'Successfully deleted' });
    });
  });

  app.get('/map', function(req, res) {
    res.sendfile('./public/views/index.html');
  });
  app.get('/newuser', function(req, res) {
    res.sendfile('./public/views/user.html');
  });
  app.get('/newbest', function(req, res) {
    res.sendfile('./public/views/best.html');
  });

};
