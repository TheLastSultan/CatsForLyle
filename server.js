const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys')

const app = express();

// DB Config
const dbinfo = keys.mySQLkey;
const server = keys.server;
const dbConfig = {
    user: dbinfo,
    password: dbinfo,
    server: server,
    database: dbinfo
};

// Setting up Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`))

//Function to connect to database and execute query
const executeQuery = function (res, query) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    res.send(res);
                }
            });
        }
    });
}




//Bcrypt hashingfuction
const hashPassword = function (password) {
    return bcrypt.hashSync(password, 8);
}

//Bcrypt checkPassword, and Check Username in 1 DB Connection 
const validateLoginRequest = function (username, password, res = res) {
    const query = `SELECT password FROM [cats] WHERE username = ${username}`
    const hash = executeQuery(res, query)
    return bcrypt.compareSync(hash, password)
}

//GET API
app.get("/cats", function (req, res) {
    const query = "select * from [cats]";
    const result = executeQuery(res, query);
    return res.json(result)
});

//POST API to register cats
app.post("/cat/register", function (req, res) {
    if (req.body.password.length <= 8) {
        return res.json({ msg: ' password less than 8 characters' })
    } else if (req.name.length === null) {
        return res.json({ msg: 'name missing' })
    } else {
        req.body.password = hashPassword(req.body.password)
        const query = "INSERT INTO [cats] (Birthdate,Breed,Image_Url,Name,Password,Username, Weight) VALUES (req.body.birthdate,req.body.breed,req.body.imageUrl, req.body.name, req.body.password, req.body.usernmae, req.body.weight)";
        const result = executeQuery(res, query);
        return res.json(result)
    }
});

//Post API to login cats 
app.post("/cat/register", function (req, res) {
    const isValid = validateLoginRequest(req.body.username, req.body.password)
    if (req.body.username.length < 1 || req.body.password < 1) {
        return res.json({ msg: 'username/password cannot be empty' })
    } else if (isValid.length === 0) {
        return res.json({ msg: 'username not found' })
    } else if (isValid === false) {
        return res.json({ msg: 'password is incorrect' })
    } else if (isValid === true) {
        const payload = { id: req.body.id, name: req.body.name }
        jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                })
            })
    } else {
        return res.json({ msg: 'something went wrong, please try again' })
    }
});

//Get Random Cats 
app.get("/cat/random", function (req, res) {
    const queryForCount = "Select Count(*) FROM [cats]"
    const count = executeQuery(queryForCount, res)
    const rand = Math.round(Math.random() * count)
    const queryForRes = `SELECT * FROM [cats] WHERE ID === ${rand}`
    return res.json(executeQuery(queryForRes, res))
})

//Search Query Post ot Cat
app.post("/cat", function (req, res) {
    let searchWhere = 'Select * WHERE '
    Object.keys(req.body).forEach(key => {
        let value = req.body[key]
        searchWhere += `${key} LIKE ${value}`
        key != "lastSeen" ? searchWhere += ` AND ` : searchWhere += ''
    })
    return res.json(executeQuery(searchWhere, res))
}
)

