const bcrypt = require('bcrypt');

const Student = require('../models/index').Student;

const config = require('../config');

module.exports = {
    // POST request to create faculty
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
        Student.findOne({empId: empId}).exec((err, student) => {
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
                        res.status(200).json(null, {
                            status: 200,
                            message: "Logged in successfully",
                            info: JSON.stringify(stu)
                        });
                    }
                });
            }
        });
    },

    // GET attendance of student
    'getAttendanceOfStudent': (req, res) => {
        // TODO: return attendance; link classroom and attendance; save ref to classroom in student;
    }
}