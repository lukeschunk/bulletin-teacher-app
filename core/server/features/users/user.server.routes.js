var Ctrl = require('./user.server.controller');

module.exports = function (app) {

    app.route('/api/users')
        .post(Ctrl.postUser)
        .get(Ctrl.getUsers);

    app.route('/api/users/:id')
        .get(Ctrl.getOneUser)
        .put(Ctrl.putUser)
        .delete(Ctrl.deleteUser);

    app.route('/api/users/login')
      .post(Ctrl.login);
};
