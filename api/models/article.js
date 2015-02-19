var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  content: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Article', ArticleSchema);