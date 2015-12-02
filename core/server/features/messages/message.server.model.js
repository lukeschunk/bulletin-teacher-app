var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var MessageSchema = new Schema({

    content: {
      type: String
    },
    date: {
      type: Date
    }

});

module.exports = mongoose.model('Message', MessageSchema);
