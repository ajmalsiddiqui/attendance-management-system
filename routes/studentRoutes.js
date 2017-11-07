const bodyParser = require('body-parser');

const router = require('express').Router();

const studentController = require('../controllers/index').studentController;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newStudent', (req, res) => {
    studentController.newStudent(req, res);
});

router.get('/', (req, res) => {
    studentController.renderStudentLogin(req, res);
});

router.get('/getClassrooms', (req, res) => {
    studentController.getClassroomsOfStudent(req, res);
});

router.post('/loginWeb', (req, res) => {
    console.log(req.body);
    studentController.loginWeb(req, res);
});

router.get('/renderClassrooms', (req, res) => {
    console.log('hello render');
    studentController.renderClassroomsOfStudent(req, res);
});

module.exports = router;