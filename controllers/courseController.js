const Course = require('../models/index').Course;

module.exports = {
    // POST request to create course
    'newCourse': (req, res) => {
        const newCourse = new Course({
            code: req.body.code,
            name: req.body.name
        });
        newCourse.save(err => {
            if(req.body.web === 'true'){
                if(err){
                    // render error
                    res.render();
                }
                else {
                    // render success
                    res.render();
                }
            }
            else{
                if(err){
                    res.status(400).json({
                        status: 400,
                        message: "Error in creating course",
                        info: JSON.stringify(err)
                    });
                }
                else {
                    res.status(200).json({
                        status: 200,
                        message: "Successfully created course",
                        info: JSON.stringify(newCourse)
                    });
                }
            }
        });
    },

    // GET request to add faculty to course
    'addFaculty': (req, res) => {
        Course.findOne({_id: req.query.courseId}).exec((err, course) => {
            if(err){
                res.status(400).json({
                    status: 400,
                    message: "Error in finding course",
                    info: JSON.stringify(err)
                });
            }
            else if(!course){
                res.status(400).json({
                    status: 400,
                    message: "Error: course doesn't exist",
                    info: "Error: course doesn't exist"
                });
            }
            else {
                Faculty.findOne({_id: req.query.facultyId}).exec((err, faculty) => {
                    if(err){
                        res.status(400).json({
                            status: 400,
                            message: "Error in finding faculty",
                            info: JSON.stringify(err)
                        });
                    }
                    else if(!faculty){
                        res.status(400).json({
                            status: 400,
                            message: "Error: no such faculty exists",
                            info: "Error: no such faculty exists"
                        });
                    }
                    else {
                        course.faculties.push(course._id);
                        course.save(err => {
                            if(err){
                                res.status(400).json({
                                    status: 400,
                                    message: "Error in creating course",
                                    info: JSON.stringify(err)
                                });
                            }
                            else {
                                res.status(200).json({
                                    status: 200,
                                    message: "Successfully created course",
                                    info: JSON.stringify(newCourse)
                                });
                            }
                        });
                    }
                });
            }
        });
    }

}