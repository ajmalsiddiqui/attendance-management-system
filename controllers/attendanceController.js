const Attendance = require('../models/index').Attendance;
const Course = require('../models/index').Course;
const Faculty = require('../models/index').Faculty;
const StudentAttendance = require('../models/index').StudentAttendance;
const Classroom = require('../models/index').Classroom;

module.exports = {
    // POST request to post attendance
    'addAttendance': (req, res) => {
        Course.findOne({ _id: req.body.courseId }).exec((err, course) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    message: "Error in finding course",
                    info: JSON.stringify(err)
                });
            }
            else if (!course) {
                res.status(400).json({
                    status: 400,
                    message: "Error: course doesn't exist",
                    info: "Error: course doesn't exist"
                });
            }
            else {
                Classroom.findOne({_id: req.body.classroomId}).exec((err, classroom) => {
                    if (err) {
                        res.status(400).json({
                            status: 400,
                            message: "Error in finding classroom",
                            info: JSON.stringify(err)
                        });
                    }
                    else if (!classroom) {
                        res.status(400).json({
                            status: 400,
                            message: "Error: classroom doesn't exist",
                            info: "Error: classroom doesn't exist"
                        });
                    }
                    else {
                        Faculty.findOne({ _id: req.body.facultyId }).exec((err, faculty) => {
                            if (err) {
                                res.status(400).json({
                                    status: 400,
                                    message: "Error in finding faculty",
                                    info: JSON.stringify(err)
                                });
                            }
                            else if (!faculty) {
                                res.status(400).json({
                                    status: 400,
                                    message: "Error: no such faculty exists",
                                    info: "Error: no such faculty exists"
                                });
                            }
                            else {
                                let newAttendance = {
                                    course: req.body.courseId,
                                    classDate: new Date(req.body.classDate),
                                    faculty: req.body.facultyId,
                                    classroom: req.body.classroomId
                                };
                                console.log('new attendance');
                                let record = {};
                                // else for faculty.findOne
                                let att = Object.assign({}, req.body);
                                delete att.courseId;
                                delete att.classDate;
                                delete att.facultyId;
                                delete att.classroomId;
                                let c = 0;
                                let records = [];
                                let studentAttendanceArray = [];
                                console.log(att);
                                for(let i in att){
                                    console.log(i);
                                    if(att.hasOwnProperty(i)){
                                        record = {};
                                        record['student'] = i.split('-')[1].toString();
                                        record['isPresent'] = (att[i] === 'present');
                                        records.push(record);
                                        let studentAttendance = new StudentAttendance({
                                            classroom: req.body.classroomId,
                                            classDate: req.body.classDate,
                                            student: i.split('-')[1].toString(),
                                            isPresent: (att[i] === 'present')
                                        });
                                        studentAttendanceArray.push(studentAttendance);
                                        c++;
                                        console.log(c);
                                        if(c === Object.keys(att).length){
                                            console.log('c done');
                                            // done making the record
                                            newAttendance.records = records;
                                            newAttendance = new Attendance(newAttendance);
                                            newAttendance.save(err => {
                                                if (err) {
                                                    res.status(400).json({
                                                        status: 400,
                                                        message: "Error in updating attendance",
                                                        info: JSON.stringify(err)
                                                    });
                                                }
                                                /*else {
                                                    res.status(200).json({
                                                        status: 200,
                                                        message: "Successfully updated attendance",
                                                        info: JSON.stringify(newAttendance)
                                                    });
                                                }*/
                                                else {
                                                    console.log('saving student attendances');
                                                    let k = 0;
                                                    studentAttendanceArray.forEach((studentAtt) => {
                                                        studentAtt.save(err => {
                                                            if(err) res.status(400).json({
                                                                status: 400,
                                                                message: "Error in updating attendance of " + studentAtt.student.toString(),
                                                                info: JSON.stringify(err)
                                                            });
                                                            else {
                                                                k++;
                                                                console.log('updated ' + studentAtt.student);
                                                                if (k === studentAttendanceArray.length){
                                                                    res.status(200).json({
                                                                        status: 200,
                                                                        message: "Successfully updated attendance",
                                                                        info: JSON.stringify(newAttendance)
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
    },

    'renderPostPage': (req, res) => {
        Classroom.findOne({course: req.query.courseId, faculty: req.query.facultyId}).populate({
                path:'students',
                model:'Student'
        }).exec((err, classroom) => {
            if(err) res.render('error', {
                info: err.toString(),
                message: "Error in finding classroom"
            });
            else if(!classroom) res.render('error', {
                info: "Error: no classroom found",
                message: "Error: no classroom found"
            });
            else {
                console.log(classroom);
                res.render('post-attendance',{
                    course: req.query.courseId,
                    faculty: req.query.facultyId,
                    date: req.query.classDate,
                    classroomId: classroom._id,
                    students: classroom.students
                });
            }
        });
    },

    'renderPostPageByEmpId': (req, res) => {
        Faculty.findOne({empId: req.query.empId}).exec((err, fac) => {
            if(err) res.render('error', {
                info: err.toString(),
                message: "Error in finding faculty"
            });
            else if(!fac) res.render('error', {
                info: "Error: no faculty found",
                message: "Error: no faculty found"
            });
            else {
                Classroom.findOne({course: req.query.courseId, faculty: fac._id}).populate({
                    path:'students',
                    model:'Student'
            }).exec((err, classroom) => {
                if(err) res.render('error', {
                    info: err.toString(),
                    message: "Error in finding classroom"
                });
                else if(!classroom) res.render('error', {
                    info: "Error: no classroom found",
                    message: "Error: no classroom found"
                });
                else {
                    console.log(classroom);
                    res.render('post-attendance',{
                        course: req.query.courseId,
                        faculty: fac._id,
                        date: req.query.classDate,
                        classroomId: classroom._id,
                        students: classroom.students
                    });
                }
            });
            }
        });
    }
}