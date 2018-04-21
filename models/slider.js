const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
	image: 	String,
});

const Slider = module.exports = mongoose.model('Slider', sliderSchema);

module.exports.getSliders = function (callback) {
	Slider.find({}, callback);
}

module.exports.addSlider = function (newSlider, callback) {
	newSlider.save(callback);
}