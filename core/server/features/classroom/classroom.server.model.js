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
            date: {type: String},
            sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
            starredBy: [{type: mongoose.Schema.Types.ObjectId}]

          }
        ]

    });


module.exports = mongoose.model('Classroom', ClassroomSchema);
