class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

const { constants } = require("crypto");
const fs = require("fs/promises");

async function initialize() {
    try {
        const studentsData = await fs.readFile("./data/students.json", "utf8");
        const coursesData = await fs.readFile("./data/courses.json", "utf8");

        const students = JSON.parse(studentsData);
        const courses = JSON.parse(coursesData);

        dataCollection = new Data(students, courses);
        return Promise.resolve(); // Resolve with the number of students
    } catch (err) {
        return Promise.reject(`${err.message}`);
    }
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("No students found.");
        }
    });
}

function getTAs() {
    return new Promise((resolve, reject) => {
        const studentTAs = [];
        for(let i = 0; i < dataCollection.students.length; i++) {
            if(dataCollection.students[i].TA){
                studentTAs.push(dataCollection.students[i])
            }
        }
        if (studentTAs.length > 0){
            resolve(studentTAs);
        } else {
            reject(`no results returned`)
        }
    }); 
}

function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses)
        } else {
            reject("No courses found")
        }
    })
}

function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        const studentbyCourse = []
        for(let i = 0; i < dataCollection.students.length; i++){
            if(dataCollection.students[i]['course'] === course){
                studentbyCourse.push(dataCollection.students[i]);
            }
        if(studentbyCourse.length > 0 ){
            resolve(studentbyCourse); 
        } else {
            reject('no results returned');
        }
        };
    });
}; 

function getStudentByNum(num){
    return new Promise((resolve, reject) => {
        const studentbyNum = []
        for(let i = 0; i < dataCollection.students.length; i++){
            if(dataCollection.students[i]['studentNum'] === num){
                studentbyNum.push(dataCollection.students[i]);
            }
        if(studentbyCourse.length > 0 ){
            resolve(studentbyNum); 
        } else {
            reject('no results returned');
        }
        };
    });
}
module.exports = {initialize,getAllStudents,getTAs,getCourses, getStudentsByCourse, getStudentByNum}

