const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'must provide title'],
		trim: true,
		maxlength: [30, 'title can not be more than 20 characters long'],
	},
	author: {
		type: String,
		required: [true, 'must provide author'],
		trim: true,
		maxlength: [30, 'author can not be more than 30 characters long'],
	},
	read: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Book', BookSchema);
