const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    faculties: {
        type: [Schema.Types.ObjectId],
        ref: 'Faculty'
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
