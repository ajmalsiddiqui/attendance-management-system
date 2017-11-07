const bcrypt = require('bcrypt');

const Student = require('../models/index').Student;

const config = require('../config');

module.exports = {
    // POST request to create student
    'newStudent': (req, res) => {
        bcrypt.hash(req.body.password, config.saltRounds, function(err, hash) {
            if(err) res.status(400).json({
                status: 400,
                message: "Error in hashing password",
                info: JSON.stringify(err)
            });
            else {
                const newStudent = new Student({
                    regno: req.body.regno,
                    name: req.body.name,
                    password: hash
                });
                newStudent.save(err => {
                    if(req.body.web === 'true'){
                        if(err){
                            // render error
                            res.render();
                        }
                        else {
                            // render success
                            res.render();
                        }
                    }
                    else{
                        if(err){
                            res.status(400).json({
                                status: 400,
                                message: "Error in creating student",
                                info: JSON.stringify(err)
                            });
                        }
                        else {
                            const stu = newStudent;
                            delete stu.password;
                            res.status(200).json({
                                status: 200,
                                message: "Successfully created student",
                                info: JSON.stringify(stu)
                            });
                        }
                    }
                });
            }
        });
    },

    // POST request for login
    'login': (req, res) => {
        Student.findOne({regno: req.body.regno}).exec((err, student) => {
            if(err) res.status(400).json({
                status: 400,
                message: "Error in finding student",
                info: JSON.stringify(err)
            });
            else if(!student) res.status(400).json({
                status: 400,
                message: "Error: no such student found",
                info: "Error: no such student found"
            });
            else {
                bcrypt.compare(req.body.password, student.password, function(err, resp) {
                    if(!resp) res.status(400).json({
                        status: 400,
                        message: "Error: invalid credentials",
                        info: "Error: invalid credentials"
                    });
                    else {
                        let stu = student;
                        delete stu.password;
                        res.status(200).json({
                            status: 200,
                            message: "Logged in successfully",
                            info: JSON.stringify(stu)
                        });
                    }
                });
            }
        });
    },

    // GET request to get classrooms
    'getClassroomsOfStudent': (req, res) => {
        Student.findOne({_id: req.query.studentId}).populate({
            path:'classrooms',
            model:'Classroom',
            select: {'students': 0},
            populate: {
                path:'course',
                model:'Course',
            },
            populate: {
                path:'faculty',
                model:'Faculty',
            }
        }).exec((err, student) => {
            console.log(err); console.log(student);
            if(err) res.status(400).json({
                status: 400,
                message: "Error in finding student",
                info: JSON.stringify(err)
            });
            else if(!student) res.status(400).json({
                status: 400,
                message: "Error: no such student found",
                info: "Error: no such student found"
            });
            else {
                delete student.password;
                // delete student.faculty.password;
                // TODO: delete faculty password
                res.status(200).json({
                    status: 200,
                    message: "Found classrooms",
                    info: JSON.stringify(student)
                });
            }
        });
    },

    'renderClassroomsOfStudent': (req, res) => {
        Student.findOne({_id: req.query.studentId}).populate({
            path:'classrooms',
            model:'Classroom',
            select: {'students': 0},
            populate: {
                path:'course',
                model:'Course',
            },
            populate: {
                path:'faculty',
                model:'Faculty',
            }
        }).exec((err, student) => {
            //console.log(err); console.log(student);
            if(err) res.render('error', {
                status: 400,
                message: "Error in finding student",
                info: JSON.stringify(err)
            });
            else if(!student) res.render('error', {
                status: 400,
                message: "Error: no such student found",
                info: "Error: no such student found"
            });
            else {
                console.log(student.classrooms);
                delete student.password;
                // delete student.faculty.password;
                // TODO: delete faculty password
                res.render('studentClassrooms', {
                    studentId: req.query.studentId,
                    message: "Found classrooms",
                    classrooms: student.classrooms
                });
            }
        });
    },

    // POST request for login
    'loginWeb': (req, res) => {
        console.log(req.body);
        Student.findOne({regno: req.body.regno}).exec((err, student) => {
            console.log(student);
            if(err) res.render('studentLogin', {
                status: 400,
                message: "Error in finding student",
                info: JSON.stringify(err)
            });
            else if(!student) res.render('studentLogin', {
                status: 400,
                message: "Error: no such student found",
                info: "Error: no such student found"
            });
            else {
                bcrypt.compare(req.body.password, student.password, function(err, resp) {
                    if(!resp) res.render('studentLogin', {
                        status: 400,
                        message: "Error: invalid credentials",
                        info: "Error: invalid credentials"
                    });
                    else {
                        // TODO: render student home page
                        let stu = student;
                        delete stu.password;
                        res.redirect('/student/renderClassrooms?studentId=' + student._id);
                    }
                });
            }
        });
    },

    'renderStudentLogin': (req, res) => {
        res.render('studentLogin');
    }
}