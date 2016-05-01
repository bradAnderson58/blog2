
// I am the blog model
// not much to me
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BlogSchema = new Schema({
  title: String,
  blog: String,
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('archive', BlogSchema);
