const express = require('express');
const router = express.Router();
const Slider = require('../models/slider');

var multer  = require('multer');

// Config Multer Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/images/sliders/');
    },
    filename: function (req, file, cb) {
    	var ext = file.mimetype.split('/').pop();
        cb(null, file.originalname + '.' + ext);
  }
})

// Config Upload
var upload = multer({ 
	storage: storage,
	limits: {fileSize: 1024*1024*3},
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
}).single('image');

// Check File Type
function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype) { 
		return cb(null, true);
	} else {
		cb('Images Only');
	}
}

router.get('/', (req, res, next) => {
	Slider.getSliders((err, sliers) => {
		if (err) {
			res.json({ success:false, msg:err });
		} else {
			res.json(sliers);
		}
	});
})

router.post('/add', (req, res, next) => {
	let newSlider = new Slider({
		image: req.body.image
	});

	Slider.addSlider(newSlider, (err, slider) => {
		if (err) {
			res.json({ success:false, msg:err });
		} else {
			res.json(slider);
		}
	})
})

// Upload File
router.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if(err){
			res.json({success: false, msg: err});
		}else{
			if (req.file == undefined){
				res.json({success: false, msg: 'No file selected'});
			} else {
				res.json({success: true, msg: 'Save file success', filename: req.file.filename});	
			}
		}
	});
})


module.exports = router;