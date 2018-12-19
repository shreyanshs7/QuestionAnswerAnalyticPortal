var mongoose = require('mongoose');

var questionChoiceSchema = new Schema({
	type : String,
	order : Number,
	chosenCount : {
		type : Number,
		default : 0
	},
	isCorrect : {
		type : Boolean,
		default : false
	}
});

var questionSchema = new Schema({
	text: {
		type: String,
		default: '',
		required: 'Please fill question text',
		trim: true
	},
	order: Number,
	questionChoices: [questionChoiceSchema]
});

var questionnaireSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill questionnaire name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	questions: [questionSchema]
});

mongoose.model('Questionnaire', QuestionnaireSchema);