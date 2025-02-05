var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var college = require("./collegeData.js")
// setup a 'route' to listen on the default url path
app.get("/students", (req, res) => {
    college.getAllStudents()
    .then(students => {
        res.json(students);
    })
    .catch(err => {
        res.status(500).json({ message: "No results"});
    });
    res.send("Hello World!");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
