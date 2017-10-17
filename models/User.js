/**
 * Here, we create as BASIC model for mongoose with
 * just the username and password fields. We can expand
 * this as much as we want.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: "Username is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required"
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
