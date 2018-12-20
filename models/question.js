var mongoose = require('mongoose');

var questionChoiceSchema = new Schema({
	option : String,
	isCorrect : {
		type : Boolean,
		default : false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt : {
		type: Date,
		default: Date.now
	},
});

var questionSchema = new Schema({
	text: {
		type: String,
		default: '',
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt : {
		type: Date,
		default: Date.now
	},
	questionChoices: [questionChoiceSchema]
});
module.exports = mongoose.model('Question', questionSchema);