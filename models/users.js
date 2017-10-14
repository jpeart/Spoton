const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;