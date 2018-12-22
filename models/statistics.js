var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var userStatSchema = new Schema({
    user : { type : Schema.Types.String , ref : User },
    attempted : { type : Number, default : 0 },
    skipped : { type : Number, default : 0 },
    correct : { type : Number, default : 0 } ,
    incorrect : { type : Number, default : 0 },
    points : { type : Number, default : 0}
});

module.exports = mongoose.model('UserStats', userStatSchema);