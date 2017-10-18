const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const loginRouter = require("./routes/login");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// connect to mongoose for an actual database login
// Database configuration with mongoose
mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_plj4bc0k:r5fifdea9tm6og50k3iajreio7@ds119598.mlab.com:19598/heroku_plj4bc0k")


const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log(`Mongoose Error: ${error}`);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// connect our API router with the
// application - these are protected by our
// JWT!
app.use(loginRouter);
app.use("/api", apiRouter);

// Send every request to the React app
// Define any API routes before this runs

// app.get("/fanta", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
