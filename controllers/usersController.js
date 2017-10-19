const db = require("../models");

// Defining methods for the controller
module.exports = {
  findById: function(req, res) {
  db.Readings
    .find({username: req.params.id})
    //.then(console.log(req.params.id))
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  insertReading: function(req,res){
    //console.log(Date.parse(req.body.time));
    req.body.time = Date.parse(req.body.time); 
  	db.Readings
  	.create(req.body)
  	.then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
  // create: function(req, res) {
  //   db.Readings
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
