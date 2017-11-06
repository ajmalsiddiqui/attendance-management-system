const bodyParser = require('body-parser');

const router = require('express').Router();

const studentController = require('../controllers/index').studentController;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newStudent', (req, res) => {
    studentController.newStudent(req, res);
});

module.exports = router;