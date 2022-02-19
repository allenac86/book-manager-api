const express = require('express');
const app = express();
const books = require('./routes/bookRoutes');
const connect = require('./db/db');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 4200;
require('dotenv').config();

// middleware
// app.use(cors()); // will enable CORS for the front end eventually
app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.redirect('/api/v1/books');
});

app.use('/api/v1/books', books);

// 404 middleware
app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await connect(process.env.MONGO_URI);
		app.listen(PORT, console.log(`Server is listening on port: ${PORT} ...`));
	} catch (err) {
		console.error(err);
	}
};

start();
