const express = require("express");
const app = express();
const books = require("./routes/bookRoutes");
const connect = require("./db/db");
const cors = require("cors");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

// middleware
app.use(cors()); // enables CORS for the front end eventually
app.use(express.json());

// routes
/**
 * redirect to resume route for now
 * come back to root path once front end skeleton is setup to
 * determine what data will be used on the landing page
 */
app.get("/", (req, res) => {
  res.json({ msg: "api v1 test root path" });
});

app.use("/api/v1/books", books);

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
