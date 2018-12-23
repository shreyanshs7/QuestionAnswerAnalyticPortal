var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
	points : { type : Number, default : 0 },
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


// db.questions.insert({ text : "What is 33-12?", points : 10, questionChoices : [ { _id : ObjectId() ,option : "10" , isCorrect : false},{ _id : ObjectId() ,option : "21", isCorrect : true },{ _id : ObjectId() ,option : "25", isCorrect : false },{ _id : ObjectId() ,option : "6", isCorrect : false }]});