var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var college = require("./modules/collegeData");
var path = require("path");
college.initialize()
.then(() => {
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

    app.get("/tas", (req, res) => {
        college.getTAs()
        .then(manager =>{
            res.json(manager);
        })
        .catch(err => {
            res.status(500).json({message: "No results"});
        })
    });

    app.get("/courses", (req, res) => {
        college.getCourses()
        .then(courses =>{
            res.json(courses);
        })
        .catch(err => {
            res.status(500).json({message: "No results"});
        })
    });

    app.get("/student/:num", (req, res) =>{
        const studentNum = req.params.num;
        college.getStudentByNum(studentNum)
        .then(student =>{
            res.json(student)
        })
        .catch(err => {
            res.status(500).json({message: "No results"});
        })
    });

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname,"./views/home.html"))
    });
    
    app.get("/about", (req, res) => {
        res.sendFile(path.join(__dirname,"./views/about.html"))
    });

    app.get("/htmlDemo", (req, res) => {
        res.sendFile(path.join(__dirname,"./views/htmlDemo.html"))
    });

    
    // setup http server to listen on HTTP_PORT
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
}).catch(err =>{
    console.log("Fail to initialize: "+err);
})

