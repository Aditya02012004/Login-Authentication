const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
// Convert data to JSON
app.use(express.json());

app.use(express.urlencoded({extended: false}));

// use EJS as the view engine
app.set('view engine', 'ejs');
// staic file
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Reguster user
app.post("/signup",async (req, res) => {
    
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // Cheeck if the user already exists
     const existingUser = await collection.findOne({ name: data.name });

     if (existingUser) {
        res.send("User already exists. Please choose a different username.");
    }else{
        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});

// Login user
app.post("/login", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("User name cannot Found.");
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, check.password);
        if(passwordMatch){
            res.render("Home");
        }else{
            res.send("Wrong Password");
        }
    } catch{
        res.send("Wrong Details.");
    }

});



const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})