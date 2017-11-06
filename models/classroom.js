const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classroomSchema = mongoose.Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },

    students: {
        type: [Schema.Types.ObjectId],
        ref: 'Student'
    }
});



const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
