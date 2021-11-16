const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find({});
		res.status(200).json({ books });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const createBook = async (req, res) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json({ book });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const getBook = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findOne({ _id: id });

		if (!book) {
			return res.status(404).json({ msg: `No book with id: ${id}` });
		}

		res.status(200).json({ book });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const updateBook = async (req, res) => {
	try {
		const { id } = req.params;

		const book = await Book.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
			runValidators: true,
		});

		if (!book) {
			return res.status(404).json({ msg: `No book with the id: ${id}` });
		}

		res.status(200).json({ book });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const deleteBook = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findOneAndDelete({ _id: id });

		if (!book) {
			return res.status(404).json({ msg: `No book with the id: ${id}` });
		}

		res.status(200).json({ message: 'book deleted', book });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

module.exports = {
	getAllBooks,
	createBook,
	getBook,
	updateBook,
	deleteBook,
};
