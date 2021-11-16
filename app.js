const express = require('express');
const app = express();
const books = require('./routes/bookRoutes');
const connectDB = require('./db/db');
require('dotenv').config();

// middleware
app.use(express.json());

// routes
app.use('/api/v1/books', books);

const PORT = 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, console.log(`Server is listening on port: ${PORT} ...`));
	} catch (err) {
		console.error(err);
	}
};

start();
