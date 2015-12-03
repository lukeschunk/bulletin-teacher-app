var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ClassroomSchema = new Schema({

    className: {
      type: String
    }


});

module.exports = mongoose.model('Classroom', ClassroomSchema);
