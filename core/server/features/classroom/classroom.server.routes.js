var Ctrl = require('./classroom.server.controller');

module.exports = function (app) {

  app.route('/api/classroom')
    .get(Ctrl.getClassrooms)
    .post(Ctrl.postClassroom);

  app.route('/api/classroom/:id')
    .get(Ctrl.getMessagesFromClassroom)
    .post(Ctrl.postNewMessageOnClassroom);
}
