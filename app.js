// Import packages
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const appRouter = require("./routes/appRouter");

// Connect to database
const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri)
    .then(() => { console.log(`Connected to database!`) })
    .catch((error) => { console.log(error.message); });

// Create an app
const app = express();
const port = 2543;

// Setup statcic folder, body parser,view engine
app.use(express.static("public")); // Public folder
app.use(express.urlencoded({ extended: false })); // Form
app.set("view engine", "ejs"); //EJS

// Define routes
app.use("/", appRouter);

// run the app
app.listen(port, () => {
    console.log(`App http://localhost:${port}`);
});