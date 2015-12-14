var Ctrl = require('./classroom.server.controller');

module.exports = function (app) {

  app.route('/api/classroom')
    .get(Ctrl.getClassrooms)
    .post(Ctrl.postClassroom);

  app.route('/api/classroom/:id')
    .get(Ctrl.getMessagesFromClassroom)
    .post(Ctrl.postNewMessageOnClassroom);


  app.route('/api/classroom/users/:id')
    .post(Ctrl.updateClassWithUser);

  app.route('/api/classroom/current/:id')
    .get(Ctrl.getClassById);
}
