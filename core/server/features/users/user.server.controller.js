var User = require('./user.server.model');


exports.getUsers = function (req, res, next) {

    User.find({})
        .exec(function (err, users) {

            if (err) res.status(500).send(err);
            else res.json(users);
        });
};


exports.getOneUser = function (req, res, next) {

    User.findById(req.params.id)
        .exec(function (err, user) {

            if (err) res.status(500).send(err);
            else res.json(user);
        });
};


exports.postUser = function (req, res, next) {

    var user = new User(req.body);
    user.save(function (err) {

        if (err) res.send(err);
        else res.json(user);
    });
};


exports.putUser = function (req, res, next) {

    User.findById(req.params.id)
        .exec(function (err, user) {

            if (err) res.status(500).send(err);
            else {
                user.name = req.body.name;
                user.teacher = req.body.teacher;
                user.email = req.body.email;
                user.save();
                res.json(user);
            }
        });
};


exports.deleteUser = function (req, res, next) {

    User.findById(req.params.id)
        .remove(function (err) {

            if (err) res.status(500).send(err);
            else res.status(204).send('Removed');
        });

};

exports.login = function(req, res, next) {
  console.log("exports.login being hit");
  User.find({email: req.body.email})
    .exec(function(err, response) {
        console.log(err, response);
       if(err) {
         res.status(500).send(err)
       } else if(!response.email) {
         res.json("there is no user with that email");
       } else if(response.password === req.body.password) {
         res.send(response)
       } else res.send(response);
    })

}
