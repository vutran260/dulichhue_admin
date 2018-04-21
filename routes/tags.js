const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');

router.get('/', (req, res, next) => {
	Tag.getTags((err, tags) => {
		if (err) {
			res.json({ success:false, msg:err });
		} else {
			res.json(tags);
		}
	});
})

router.post('/add', (req, res, next) => {
	let newTag = new Tag({
		value: req.body.value
	});

	Tag.addTag(newTag, (err, tag) => {
		if (err) {
			res.json({ success:false, msg:err });
		} else {
			res.json({ success:true, tag:tag });
		}
	})
})

module.exports = router;