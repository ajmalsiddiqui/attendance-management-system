const Classroom = require('./classroom');
const Course = require('./course');
const Faculty = require('./faculty');
const Student = require('./student');
const Attendance = require('./attendance');
const StudentAttendance = require('./studentAttendance');

module.exports = {
    'Classroom': Classroom,
    'Course': Course,
    'Faculty': Faculty,
    'Student': Student,
    'Attendance': Attendance,
    'StudentAttendance': StudentAttendance
}