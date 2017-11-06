const bodyParser = require('body-parser');

const router = require('express').Router();

const studentAttendanceController = require('../controllers/index').studentAttendanceController;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/getAttendancesByClassroom', (req, res) => {
    studentAttendanceController.getAttendancesOfStudentByClassroom(req, res);
});

router.get('/getOverallAttendanceByClassroom', (req, res) => {
    studentAttendanceController.getOverallAttendanceByClassroom(req, res);
});

module.exports = router;