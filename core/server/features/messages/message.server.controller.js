var Message = require('./message.server.model');
var Classroom = require('../classroom/classroom.server.model');

console.log("this is Classroom", Classroom);

exports.getMessages = function (req, res, next) {

     Message.find({})
        .exec(function (err, messages) {

            if(err) res.status(500).send(err);

            else res.json(messages)
        });
};

exports.postMessage = function (req, res, next) {
  console.log("this is Classroom", Classroom);
    console.log("this is req", req);
    console.log("controller is being hit");
    var message = new Message(req.body);
    message.save(function (err) {

      if (err) res.send(err);
      else res.json(message);

    });

}
