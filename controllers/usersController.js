const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findById: function(req, res) {
  db.Readings
    .findOne({username: req.params.id})
    //.then(console.log(req.params.id))
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};
