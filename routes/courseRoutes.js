const bodyParser = require('body-parser');

const router = require('express').Router();

const courseController = require('../controllers/index').courseController;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newCourse', (req, res) => {
    courseController.newCourse(req, res);
});

module.exports = router;