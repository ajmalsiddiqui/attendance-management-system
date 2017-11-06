const bodyParser = require('body-parser');

const router = require('express').Router();

const classroomController = require('../controllers/index').classroomController;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newClass', (req, res) => {
    classroomController.newClass(req, res);
});

router.post('/addStudent', (req, res) => {
    classroomController.addStudent(req, res);
});

router.get('/renderClassroom', (req, res) => {
    classroomController.renderStudentsInClassroom(req, res);
});

module.exports = router;