const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const routes = require('./routes/index');

const config = require('./config');

app.set('views', path.normalize(__dirname + '/views'))
app.engine('hbs', hbs({
    defaultLayout: path.normalize(__dirname + '/views/layouts/main.hbs'),
    layoutsDir: path.normalize(__dirname + '/views/layouts'),
    partialsDir: path.normalize(__dirname + '/views/partials')
}));
app.set('view engine', 'hbs');

app.use('/', express.static(path.normalize(__dirname + '/public')));

app.use('/attendance', routes.attendanceRoutes);
app.use('/faculty', routes.facultyRoutes);
app.use('/course', routes.courseRoutes);
app.use('/classroom', routes.classroomRoutes);
app.use('/student', routes.studentRoutes);
app.use('/studentAttendance', routes.studentAttendanceRoutes);

console.log("database: " + config.db_url);
mongoose.connect(config.db_url, (err) => {
    if(err) console.log(err);
});

app.listen(config.port, () => {
    console.log('Server running at port ' + config.port);
});