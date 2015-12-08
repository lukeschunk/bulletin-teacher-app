var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    var ClassroomSchema = new Schema({

        className: {
          type: String
        },
        usersInClass: [
          {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false}
        ],
        messagesInClass:
        [
          {
            content: { type: String},
            date: {type: Date, default: new Date},
            sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false}
          }
        ]

    });


module.exports = mongoose.model('Classroom', ClassroomSchema);
