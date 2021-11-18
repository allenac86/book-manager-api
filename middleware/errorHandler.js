const { CustomError } = require('../errors/CustomError');

const errorHandler = (err, req, res, next) => {
	if (err instanceof CustomError) {
		console.log(err);
		return res.status(err.statusCode).json({ msg: err.message });
	}
	return res
		.status(500)
		.json({ msg: 'Something went wrong, please try again' });
};

module.exports = errorHandler;
