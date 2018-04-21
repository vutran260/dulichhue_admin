const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
	value: 	String,
	vote: 	{type: Number, default: 0}
});

const Tag = module.exports = mongoose.model('Tag', tagSchema);

module.exports.getTags = function (callback) {
	Tag.find({}, callback);
}

module.exports.addTag = function (newTag, callback) {
	newTag.save(callback);
}