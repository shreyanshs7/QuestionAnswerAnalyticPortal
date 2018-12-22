var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var userStatSchema = new Schema({
    user : { type : Schema.Types.ObjectId , ref : User },
    attempted : { type : Number, default : 0 },
    skipped : { type : Number, default : 0 },
    correct : { type : Number, default : 0 } 
});

module.exportss = mongoose.model('UserStats', userStatSchema);