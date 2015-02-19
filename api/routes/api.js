var User = require('../models/user');
var Article = require('../models/article')
var jwt = require('jsonwebtoken');
var config = require('../../config');

var secret = config.secret;

module.exports = function(app, express){
  var apiRouter = express.Router();
  apiRouter.use; 

  apiRouter.get('/', function(req, res){
    res.json({message: 'welcome to our api'});
  });

  //create new user 
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

  apiRouter.post('/authenticate', function(req, res){
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user){
      console.log(user);
      if (err) throw err;

      if(!user){
        res.json({
          success: false,
          message: 'Authentication failed. User not found'
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword){
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password'
          })
        } else {
          var token = jwt.sign({
            name: user.name,
            userId: user._id,
            username: user.username
          }, secret, {
            expiresInMinutes: 1440
          });
          res.json({
            success: true,
            message: 'Enjoy your token',
            token: token
          });
        }
      }
    })
  })

  apiRouter.use(function(req, res, next){
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token){
      jwt.verify(token, secret, function(err, decoded){
        if(err){
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token'
          });
        } else {
          req.decoded = decoded;
          console.log(decoded);
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      })
    }
  })

  apiRouter.get('/me', function(req, res){
    res.send(req.decoded);
  })

  apiRouter.route('/users')
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

  apiRouter.route('/articles')
    .get(function(req, res){
      Article.find(function(err, data){
        console.log(data);
        res.json(data);
      })
    })

    .post(function(req, res){
      var article = new Article();
      article.title = req.body.title;
      article.content = req.body.content;
      article.author = req.body.author;

      article.save(function(err){
        if (err) console.log(err);
        res.json({message: "article created!"})
      })
    })

 return apiRouter;
}