var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var MessageSchema = new Schema({

    content: {
      type: String
    },
    date: {
      type: Date
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false
    }


});

module.exports = mongoose.model('Message', MessageSchema);
