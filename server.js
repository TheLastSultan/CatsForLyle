const express = require('express');
const mongoose = require('mongoose');


const app = express();

// DB Config
const dbinfo = require('./config/keys').mySQLkey;
const server = require('./config/keys').server;
const dbConfig = {
    user: dbinfo,
    password: dbinfo,
    server: server,
    database: dbinfo
};

// Setting up Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))
// Test Server 
// app.get('/', (req, res) => res.send('Hello'));


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


