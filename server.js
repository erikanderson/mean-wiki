var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var jwt        = require('jsonwebtoken');

var config = require('./config');
var User = require('./api/models/user');

var apiRoutes = require('./api/routes/api')(app, express);
// var articlesRoute = require('./api/routes/articles')(app, express)


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('the mongoose is loose');
})

app.use(express.static(__dirname+'/public'));

app.use('/api', apiRoutes);
// app.use('/articles', articlesRoute);

// app.get('*', function(req, res){
//   res.sendFile(path.join(__dirname + '/public/index.html'));
// })

app.listen(config.port);
console.log('express running on port:', config.port);