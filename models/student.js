const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
    regno: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    /*courses: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }*/
    /*courses: {
        type: [new Schema({
            course: {
                type: Schema.Types.ObjectId,
                ref: 'Course'
            },
            classroom: {
                type: Schema.Types.ObjectId,
                ref: 'Classroom'
            }
        })]
    }*/
    classrooms: {
        type: [Schema.Types.ObjectId],
        ref: 'Classroom'
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
