const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secret_key = require("../secret");
const User = require("../models/User");

// our route is NOT protected by the JWT, but
// it will create the token for a user
// who can successfully login
router.post("/login", (req, res)=> {
    console.log("LOGIN REQUEST =======");
    User.find({
        username: req.body.username,
        password: req.body.password
    }, (err, data) => {
        // if there was an error OR we didn't find a record
        // matching the username and password given by the
        // login request, send a 404 (not found) back
        if (err || data.length === 0) {
            res.sendStatus(404);
        } else {
            res.json({
                data: data,
                token: jwt.sign({
                    user: "mytestuser"
                }, secret_key)
            })
        }
    });
});

module.exports = router;
