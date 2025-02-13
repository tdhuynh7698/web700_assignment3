var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var college = require("./modules/collegeData")
// setup a 'route' to listen on the default url path
app.get("/students", (req, res) => {
    if(req.query.course){
        college.getStudentsByCourse(req.query.course)
        .then(students => {
            res.json(students);
        })
        .catch(err => {
            res.status(500).json({message: "No results"});
        });
    } else{
        college.getAllStudents()
        .then(students => {
            res.json(students);
        })
        .catch(err => {
            res.status(500).json({ message: "No results"});
        });
    }
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
