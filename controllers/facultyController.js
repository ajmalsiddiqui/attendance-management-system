const bcrypt = require('bcrypt');

const Faculty = require('../models/index').Faculty;

const config = require('../config');

module.exports = {
    // POST request to create faculty
    'newFaculty': (req, res) => {
        bcrypt.hash(req.body.password, config.saltRounds, function(err, hash) {
            if(err) res.status(400).json({
                status: 400,
                message: "Error in hashing password",
                info: JSON.stringify(err)
            });
            else {
                const newFac = new Faculty({
                    empId: req.body.empId,
                    name: req.body.name,
                    password: hash
                });
                newFac.save(err => {
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
                                message: "Error in creating faculty",
                                info: JSON.stringify(err)
                            });
                        }
                        else {
                            const fac = newFac;
                            delete fac.password;
                            res.status(200).json({
                                status: 200,
                                message: "Successfully created faculty",
                                info: JSON.stringify(fac)
                            });
                        }
                    }
                });
            }
        });
    },

    // POST request for login
    'login': (req, res) => {
        Faculty.findOne({empId: empId}).exec((err, faculty) => {
            if(err) res.status(400).json({
                status: 400,
                message: "Error in finding faculty",
                info: JSON.stringify(err)
            });
            else if(!faculty) res.status(400).json({
                status: 400,
                message: "Error: no such faculty found",
                info: "Error: no such faculty found"
            });
            else {
                bcrypt.compare(req.body.password, faculty.password, function(err, resp) {
                    if(!resp) res.status(400).json({
                        status: 400,
                        message: "Error: invalid credentials",
                        info: "Error: invalid credentials"
                    });
                    else {
                        let fac = faculty;
                        delete fac.password;
                        res.status(200).json(null, {
                            status: 200,
                            message: "Logged in successfully",
                            info: JSON.stringify(fac)
                        });
                    }
                });
            }
        });
    },

    'renderFacultyLogin': (req, res) => {
        res.render('facultyLogin');
    },

    // POST request for login
    'loginWeb': (req, res) => {
        console.log(req.body);
        Faculty.findOne({empId: req.body.empId}).exec((err, faculty) => {
            console.log(faculty);
            if(err) res.render('studentLogin', {
                status: 400,
                message: "Error in finding faculty",
                info: JSON.stringify(err)
            });
            else if(!faculty) res.render('facultyLogin', {
                status: 400,
                message: "Error: no such faculty found",
                info: "Error: no such faculty found"
            });
            else {
                bcrypt.compare(req.body.password, faculty.password, function(err, resp) {
                    if(!resp) res.render('facultyLogin', {
                        status: 400,
                        message: "Error: invalid credentials",
                        info: "Error: invalid credentials"
                    });
                    else {
                        // TODO: render student home page
                        let stu = faculty;
                        delete stu.password;
                        // render faculty classrooms
                        res.redirect('/attendance/renderPostPageByEmpId?empId=' + faculty.empId + '&courseId=' + req.body.courseId + '&classDate=' + req.body.classDate );
                    }
                });
            }
        });
    },
}