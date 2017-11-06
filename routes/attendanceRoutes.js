const bodyParser = require('body-parser');

const router = require('express').Router();

const attendanceController = require('../controllers/index').attendanceController;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/postAttendance', (req, res) => {
    console.log(req.body);
    console.log(Object.keys(req.body).length);
    //res.end('done');
    attendanceController.addAttendance(req, res);
});

module.exports = router;