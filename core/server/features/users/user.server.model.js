var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    teacher: {
        type: Boolean
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    classesBelongTo : [
      {type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true}
    ],
    starredMessages: [
      {type:mongoose.Schema.Types.ObjectId, ref: 'Message', required: false}
    ],
    image: {
      type: String
    }
});


module.exports = mongoose.model('User', UserSchema);
