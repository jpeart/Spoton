const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://heroku_plj4bc0k:r5fifdea9tm6og50k3iajreio7@ds119598.mlab.com:19598/heroku_plj4bc0k",
  {
    useMongoClient: true
  }
);

const UserSeed = [{username: "Wilfred Brimley", password: "wb"},
			{username: "Danny Dorito", password: "dd"},
			{username: "Don Cheeto", password: "dc"}];

 db.User
  .remove({})
  .then(() => db.User.collection.insertMany(UserSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
