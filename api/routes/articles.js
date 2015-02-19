var Article = require('../models/article');
var config = require('../../config');

module.exports = function(app, express){
  var articlesRouter = express.Router();
  articlesRouter.use;

  articlesRouter.get('/all', function(req, res){
    res.json({message:"in articles/all route"})
  })
  return articlesRouter;
}ß