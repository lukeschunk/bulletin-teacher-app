var Classroom = require('./classroom.server.model');

exports.getClassrooms = function (req, res, next) {

     Classroom.find({})
        .exec(function (err, classrooms) {

            if(err) res.status(500).send(err);

            else res.json(classrooms)
        });
};

exports.postClassroom = function (req, res, next) {
    console.log("controller is being hit", req.body);
    var classroom = new Classroom(req.body);
    classroom.save(function (err) {

      if (err) res.send(err);
      else res.json(classroom);

    });

};

exports.getMessagesFromClassroom = function(req, res, next) {
  Classroom.findById(req.params.id)
    .populate('usersInClass')
    .populate('messagesInClass.sender')

    .exec().then(function(populatedClass, err) {
      if(err) res.send(err);
      else res.status(200).send(populatedClass);
    });
};

exports.postNewMessageOnClassroom = function(req, res, next) {
  Classroom.findById(req.params.id)
    .exec(function(err, classroom) {
      classroom.messagesInClass.push(req.body);
      classroom.save(function(err, data) {
        if(err) res.send(err);
        else res.status(200).send(data)
      })
    })
}
