const StudentAttendance = require('../models/index').StudentAttendance;
const Attendance = require('../models/index').Attendance;

module.exports = {
    // GET request to get attendance of student by classroom and date
    // Should return array of docs
    'getAttendancesOfStudentByClassroom': (req, res) => {
        StudentAttendance.find({
            student: req.query.studentId,
            classroom: req.query.classroomId
            // ,classDate: req.query.classDate //uncomment to add date to query
        }).exec((err, attendances) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    message: "Error in finding student attendance",
                    info: JSON.stringify(err)
                });
            }
            else {
                res.status(200).json({
                    status: 200,
                    message: "Successfully found records",
                    info: JSON.stringify(attendances)
                });
            }
        });
    },

    // GET request to get overall attendance in a subject
    'getOverallAttendanceByClassroom': (req, res) => {
        Attendance.find({classroom: req.query.classroomId}).exec((err, attendances) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    message: "Error in finding attendance",
                    info: JSON.stringify(err)
                });
            }
            else {
                const totalClasses = attendances.length;
                StudentAttendance.find({
                    student: req.query.studentId,
                    classroom: req.query.classroomId
                }).exec((err, studentAttendances) => {
                    if (err) {
                        res.status(400).json({
                            status: 400,
                            message: "Error in finding student attendance",
                            info: JSON.stringify(err)
                        });
                    }
                    else {
                        let attendedClasses = 0;
                        let k = 0;
                        studentAttendances.forEach(studentAttendance => {
                            if(studentAttendance.isPresent) attendedClasses++;
                            k++;
                            if(k === studentAttendances.length){
                                res.status(200).json({
                                    status: 200,
                                    message: "Successfully found percentage",
                                    info: JSON.stringify({
                                        classroom: req.query.classroomId,
                                        totalClasses: totalClasses,
                                        attendedClasses: attendedClasses,
                                        percentage: (attendedClasses/totalClasses)*100
                                    })
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}