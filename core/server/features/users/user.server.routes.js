var Ctrl = require('./user.server.controller');

module.exports = function (app) {

    app.route('/api/users')
        .post(Ctrl.postUser)
        .get(Ctrl.getUsers);

    app.route('/api/users/:id')
        .get(Ctrl.getOneUser)
        .delete(Ctrl.deleteUser)
        .put(Ctrl.updateUserWithClassId);

    app.route('/api/users/login')
      .post(Ctrl.login);

    app.route('/api/users/delete/:id')
      .delete(Ctrl.deleteUser);

};
