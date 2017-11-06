const attendanceController = require('./attendanceController');
const classroomController = require('./classroomController');
const courseController = require('./courseController');
const facultyController = require('./facultyController');
const studentController = require('./studentController');
const studentAttendanceController = require('./studentAttendanceController');

module.exports = {
    'attendanceController': attendanceController,
    'classroomController': classroomController,
    'courseController': courseController,
    'facultyController': facultyController,
    'studentController': studentController,
    'studentAttendanceController': studentAttendanceController
}