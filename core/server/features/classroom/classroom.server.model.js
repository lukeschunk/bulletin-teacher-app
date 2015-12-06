var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


    var ClassroomSchema = new Schema({

        className: {
          type: String
        },
        usersInClass: [
          {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false}
        ],
        groupsInClass:
        [
          {
            groupName: { type: String },
            usersInGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
            messagesInGroup:
            [
              {
                content: { type: String},
                date: {type: Date},
                sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false}
              }
            ]
          }
        ]


    });


module.exports = mongoose.model('Classroom', ClassroomSchema);
