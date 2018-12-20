var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var salt = 7;

var userSchema = new Schema({
	name: { type : String, required : true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	created_at: { type : Date, default : Date.now },
	updated_at: { type : Date, default : Date.now }
});

userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, salt, function(err, hash){
		if(err) return next(err);
		user.password = hash;
		next();	
	});
});

userSchema.methods.validatePassword = function(password, userPassword) {
	return bcrypt.compare(password, userPassword).then((res) => {
		return res;
	}).catch( err => {
		console.log("ERROR", err);
	});
}

module.exports = mongoose.model('User', userSchema);