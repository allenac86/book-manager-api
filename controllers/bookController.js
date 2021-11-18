const Book = require('../models/Book');
const asyncHandler = require('../middleware/asyncHandler');
const { createCustomError } = require('../errors/CustomError');

const getAllBooks = asyncHandler(async (req, res) => {
	const books = await Book.find({});
	res.status(200).json({ books });
});

const createBook = asyncHandler(async (req, res) => {
	const book = await Book.create(req.body);
	res.status(201).json({ book });
});

const getBook = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const book = await Book.findOne({ _id: id });

	if (!book) {
		return next(createCustomError(`No book found with id: ${id}`, 404));
	}

	res.status(200).json({ book });
});

// PATCH - will only update properties with values provided
const updateBook = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const book = await Book.findOneAndUpdate({ _id: id }, req.body, {
		new: true,
		runValidators: true,
		// overwrite: true // uncomment if you prefer PUT instead of PATCH in routes
	});

	if (!book) {
		return next(createCustomError(`No book found with id: ${id}`, 404));
	}

	res.status(200).json({ book });
});

const deleteBook = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const book = await Book.findOneAndDelete({ _id: id });

	if (!book) {
		return next(createCustomError(`No book found with id: ${id}`, 404));
	}

	res.status(200).json({ message: 'book deleted', book });
});

module.exports = {
	getAllBooks,
	createBook,
	getBook,
	updateBook,
	deleteBook,
};
