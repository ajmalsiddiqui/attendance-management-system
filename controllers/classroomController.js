const Course = require('../models/index').Course;
const Student = require('../models/index').Student;
const Faculty = require('../models/index').Faculty;
const Classroom = require('../models/index').Classroom;

module.exports = {
    // POST request to create a new class
    'newClass': (req, res) => {
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
                        const newClass = new Classroom({
                            course: course._id,
                            faculty: faculty._id
                        });
                        newClass.save(err => {
                            if (err) {
                                res.status(400).json({
                                    status: 400,
                                    message: "Error in creating classroom",
                                    info: JSON.stringify(err)
                                });
                            }
                            else {
                                res.status(200).json({
                                    status: 200,
                                    message: "Successfully created classroom",
                                    info: JSON.stringify(newClass)
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    // POST request to add student
    'addStudent': (req, res) => {
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
                    message: "Error: no such classroom exists",
                    info: "Error: no such classroom exists"
                });
            }
            else {
                Student.findOne({_id: req.body.studentId}).exec((err, student) => {
                    if (err) {
                        res.status(400).json({
                            status: 400,
                            message: "Error in finding student",
                            info: JSON.stringify(err)
                        });
                    }
                    else if (!student) {
                        res.status(400).json({
                            status: 400,
                            message: "Error: no such student exists",
                            info: "Error: no such student exists"
                        });
                    }
                    else{
                        classroom.students.push(student._id);
                        classroom.save(err => {
                            if (err) {
                                res.status(400).json({
                                    status: 400,
                                    message: "Error in updating classroom",
                                    info: JSON.stringify(err)
                                });
                            }
                            else {
                                res.status(200).json({
                                    status: 200,
                                    message: "Successfully added student to classroom",
                                    info: JSON.stringify(classroom)
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    // GET request to find all students by classroom
    'getStudentsInClassroom': (req, res) => {
        Classroom.findOne({_id: req.query.classroomId}).populate('student').exec((err, classroom) => {
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
                    message: "Error: no such classroom exists",
                    info: "Error: no such classroom exists"
                });
            }
            else {
                res.status(200).json({
                    status: 200,
                    message: "Successfully found students",
                    info: JSON.stringify(classroom)
                });
            }
        });
    },

    'renderStudentsInClassroom': (req, res) => {
        Classroom.findOne({_id: req.query.classroomId}).populate({
            path:'students',
            model:'Student'
        }).exec((err, classroom) => {
            if (err) {
                res.render('error', {
                    status: 400,
                    message: "Error in finding classroom",
                    info: JSON.stringify(err)
                });
            }
            else if (!classroom) {
                res.render('error', {
                    status: 400,
                    message: "Error: no such classroom exists",
                    info: "Error: no such classroom exists"
                });
            }
            else {
                console.log(classroom.students);
                res.render('post-attendance', {
                    status: 200,
                    message: "Successfully found students",
                    info: JSON.stringify(classroom),
                    course: classroom.course,
                    faculty: classroom.faculty,
                    date: req.query.date,
                    students: classroom.students
                });
            }
        });
    }
}