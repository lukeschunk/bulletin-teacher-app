var Ctrl = require('./message.server.controller');

module.exports = function (app) {

  app.route('/api/messages')
    .get(Ctrl.getMessages)
    .post(Ctrl.postMessage);

}
