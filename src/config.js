const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

// check database connected or not
connect.then(() => {
    console.log("Database connected successfully");
}).catch(() => {
    console.log("Database cannot connected");
});

// Create Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create Model
const collection = mongoose.model("users", LoginSchema);

module.exports = collection;