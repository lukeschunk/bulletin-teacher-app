var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var MessageSchema = new Schema({

    className: {
      type: String
    }


});

module.exports = mongoose.model('Message', MessageSchema);
