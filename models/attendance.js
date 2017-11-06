const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = mongoose.Schema({
  course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
  },

  classDate: {
      type: Date,
      required: true
  },

  classroom: {
      type: Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true
  },

  faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty'
  },

  records: {
    type: [
        new Schema({
            student: {
                type: Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            isPresent: {
                type: Boolean,
                default: false,
                required: true
            }
        })
    ]
  }
});



const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
