const express = require('express');
const app = express();
const books = require('./routes/bookRoutes');
const connect = require('./db/db');
const cors = require('cors');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/books', books);

// 404 middleware
app.use(notFound);
app.use(errorHandler);

const PORT = 3000;

const start = async () => {
	try {
		await connect(process.env.MONGO_URI);
		app.listen(PORT, console.log(`Server is listening on port: ${PORT} ...`));
	} catch (err) {
		console.error(err);
	}
};

start();
