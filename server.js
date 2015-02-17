var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var port       = process.env.PORT || 8080;

mongoose.createConnection('mongodb://localhost/mean-wiki');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('the mongoose is loose');
})

var User = require('./api/models/user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
mongoose.connect('mongodb://localhost/mean-wiki');

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
})

app.use(morgan('dev'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use(function(req, res, next){
  // console.log('someone just accessed our api');
  next();
})

apiRouter.route('/users')
  .post(function(req, res){
    console.log('in user post');
    var user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err){
      if (err){
        if(err.code === 11000){
          return res.json({success: false, message: 'A user with that username already exists'});
        } else {
          return res.send(err);
        }
      }
      else {
        res.json({ message: 'User created!'});
      }
    })
  })
  .get(function(req, res){
    User.find(function(err, users){
      if (err) res.send(err);
      res.json(users);
    })
  })

apiRouter.route('/users/:user_id')
  .get(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      if (err) res.send(err);
      res.json(user);
    })
  })
  .put(function(req, res){
    // console.log('in user put');
    User.findById(req.params.user_id, function(err, user){
      if (err) res.send(err);

      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;

      user.save(function(err){
        if (err) res.send(err);
        res.json({message: "User updated"});
      });

    })
  })
  .delete(function(req, res){
    User.remove({
      _id: req.params.user_id
    }, function(err, user){
      if(err) return res.send(err);
      res.json({message: "successfully deleted"});
    })
  })

apiRouter.get('/', function(req, res){
  res.json({message: 'welcome to our api'});
})

app.use(express.static(__dirname+'/public'));


app.listen(port);
console.log('express running on port:', port);