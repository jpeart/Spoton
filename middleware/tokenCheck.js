/**
 * TokenCheck middleware will check for our json web token. Since it is
 * in a separate file, we can import it in any part of our app
 * and use it as we need.
 */
const jwt = require('jsonwebtoken');
const secret_key = require("../secret");

const tokenCheck = (req, res, next)=>{
    console.log("You are trying to access a data route!");
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.length > 0) {
        // split the header which should look like:
        // Bearer xxxx.yyy.zzzz
        // then assign it to the value on the req for our route to see!
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secret_key, (err, data) => {
            if(err) {
                res.sendStatus(403);
            } else {
                req.token = {
                    token,
                    data: data
                };
                // If everything is okay, we tell the middleware to
                // go to the "next" thing in the list, either the next
                // middleware or the route the user was trying to access
                next();
            }
        });
    } else {
         // if it doesn't exist, then we just say forbidden!
         // no soup for you!
         res.sendStatus(403); // means forbidden!
    }
}

module.exports = tokenCheck;
