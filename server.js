
// require mongoose for REST interface
// post schema from the blog model
var mongoose = require('mongoose');
var Post = require('./Models/blog');
var Utils = require('./utils.js');

// import the packages we will need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var fs = require('fs');

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
var theName;
var thePass;
fs.readFile('config', 'utf8', function(err, data) {
  if (err) return console.log(err);
  var arr = data.split('\n');
  theName = arr[0];
  thePass = arr[1];
});

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

    // verify sender
    var name = req.body.name;
    var pass = req.body.pass;
    if (name === theName && pass === thePass) {

      // first check if this post already exists
      var post = new Post();
      post.title = req.body.title;
      post.blog = req.body.blog;
      post.updated_at.year = req.body.year;
      post.updated_at.month = req.body.month;
      post.updated_at.day = req.body.day;

      Post.find({title: req.body.title}, function(err, data) {
        if (err) console.log(err);
        if (data.length !== 0) {
          console.log('already exists, updating');
          Post.update({title: post.title}, {
              blog: post.blog,
              updated_at: post.updated_at
            }, function(err, data) {
              if (err)
                res.send(err);

              res.send({message: 'Updated!'});
          });
        } else {
          console.log('does not exist, creating');
          post.save(function(err) {
            if (err)
              res.send(err);

            res.json({message: 'Created'});
          });
        }

      });
    } else {
      res.json({message: 'whodis?'});
    }
  });

// Get request for all the titles
// this will be used to print a list of all the titles
router.route('/titles').get(function(req, res) {
  // dont forget this syntax: Post.find({}, {title: 1, _id: 0}, function(err, data) {
  Post.find({}, function(err, data) {
    if (err) throw err;

    var timeSorted = Utils.sortByTime(data);
    res.json(timeSorted);
  });

});

// Get request for a specific post by title
// this will return the post to be populated in the main pane
router.route('/getpost').get(function(req, res) {
  var title = req.query['title'];

  Post.find({title: title}, function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.use('/api', router);
// routes for app
app.get('/beditor', function(req, res) {
  res.render('pad');
});
app.get('/', function(req, res) {
  res.render('archive');
});

app.listen(port);
console.log("server started, listening on " + port);
