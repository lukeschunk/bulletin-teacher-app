var Classroom = require('./classroom.server.model');

exports.getClassrooms = function (req, res, next) {

     Classroom.find({})
        .exec(function (err, classrooms) {

            if(err) res.status(500).send(err);

            else res.json(classrooms)
        });
};

exports.postClassroom = function (req, res, next) {
    console.log("controller is being hit");
    var classroom = new Classroom(req.body);
    classroom.save(function (err) {

      if (err) res.send(err);
      else res.json(classroom);

    });

}
