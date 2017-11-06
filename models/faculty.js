const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facultySchema = mongoose.Schema({
    empId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
