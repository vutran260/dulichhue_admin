const mongoose = require('mongoose');

// Comment Schema
const CommentSchema = mongoose.Schema({
    body:   String,
    date: {type: Date, default: Date.now},
    author: String,
    avatar: String
})

// User Schema
const BlogSchema = mongoose.Schema({
	title:  String,
	des: 	String,
    author: String,
    body:   String,
    image: 	{type: String, default: 'http://placehold.it/700x200'},
    comments: [CommentSchema],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
	
});

const Blog = module.exports = mongoose.model('Blog', BlogSchema);

module.exports.addBlog = function (newBlog, callback) {
	newBlog.save(callback);
}

module.exports.getBlogs = function (callback) {
	Blog.find({}, callback);
}

module.exports.searchBlogs = function (q, callback) {
    let or = [
        {'title':   new RegExp(q, 'i')},
        {'author':  new RegExp(q, 'i')},
        {'des':     new RegExp(q, 'i')},
    ];
    Blog.find({ $or: or }, callback);
}

module.exports.findById = function (_id, callback) {
    let query = {_id: _id};
    Blog.findOne(query, callback);
}

module.exports.addComment = function (_id, newComment, callback) {
    let query = {_id: _id};
    Blog.findOne(query, (err, blog) => {
        if (err) throw err;
        
        blog.comments.push(newComment);
        blog.save(callback);
    })
}

module.exports.prevBlog = function (date, callback) {
    Blog.findOne({date: {$lt: date}}, '_id' , callback);
}

module.exports.nextBlog = function (date, callback) {
    Blog.findOne({date: {$gt: date}}, '_id' , callback);
}