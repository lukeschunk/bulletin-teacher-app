var Message = require('./message.server.model');

exports.getMessages = function (req, res, next) {

     Message.find({})
        .exec(function (err, messages) {

            if(err) res.status(500).send(err);

            else res.json(messages)
        });
};

exports.postMessage = function (req, res, next) {
    console.log("controller is being hit");
    var message = new Message(req.body);
    message.save(function (err) {

      if (err) res.send(err);
      else res.json(message);

    });

}
