var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {
        type: String
    },
    teacher: {
        type: Boolean
    },
    email: {
      type: String
    },
    
});


module.exports = mongoose.model('User', UserSchema);
