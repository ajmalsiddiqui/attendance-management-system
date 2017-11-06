const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentAttendanceSchema = mongoose.Schema({
  student: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
  },
  classroom: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  classDate: {
    type: Date,
    required: true
  },
  isPresent: {
      type: Boolean,
      required: true,
      default: false
  }
});



const StudentAttendance = mongoose.model('StudentAttendance', studentAttendanceSchema);

module.exports = StudentAttendance;
