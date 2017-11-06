const bodyParser = require('body-parser');

const router = require('express').Router();

const facultyController = require('../controllers/index').facultyController;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newFaculty', (req, res) => {
    facultyController.newFaculty(req, res);
});

module.exports = router;