
// require mongoose for REST interface
// post schema from the blog model
var mongoose = require('mongoose');
var Post = require('./Models/blog');

// import the packages we will need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// set up configuration stuffs
mongoose.connect('mongodb://localhost:27017/my_database');

// set the view engine to ejs
app.set('view engine', 'ejs');
// public folder to store assets
app.use(express.static(__dirname + '/public'));

// configure app to use bodyParser
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// listen on port 8000 or defined port
var port = process.env.PORT || 8000;
var theName = process.env.NAME;
var thePass = process.env.SECRET;

// middleware used for all requests
var router = express.Router();
router.use(function(req, res, next) {
  console.log("something is happening");
  next();
});

// post a new blog to the server
router.route('/post')
  // create the post request
  .post(function(req, res) {

    var post = new Post();
    post.title = req.body.title;
    post.blog = req.body.blog;
    var name = req.body.name;
    var pass = req.body.pass;

    // if statement, we need to to some checking here
    if (name === theName && pass === thePass) {
      post.save(function(err) {
        if (err)
         res.send(err);

        res.json({message: 'Created!'});
      });
    } else {
      res.json({message: 'whodis?'});
    }
  });

app.use('/api', router);
// routes for app
app.get('/beditor', function(req, res) {
  res.render('pad');
});
app.get('/', function(req, res) {
  res.render('test');
});

app.listen(port);
console.log("server started, listening on " + port);
