var express = require('express');
var Question = require('../models/question');
var UserStat = require('../models/statistics');
var router = express.Router();

router.get('/', function (req, res) {
	Question.find({}).exec()
		.then(response => {
			res.render('questions', { questions: response });
		})
		.catch(error => {
			console.log(error);
		});
});

router.post('/submit', function (req, res) {
	var object = [];
	var response = Object.values(req.body)[0];
	for (let index = 0; index < response.length; index++) {
		var element = response[index].split('_');
		var answerId = element[0];
		var questionId = element[1];
		if (answerId != "") {
			Question.findById({ _id: questionId }).exec()
				.then(response => {
					var correctAnswer = response.questionChoices.filter((answer) => {
						return answer.isCorrect == true;
					});

					var givenAnswer = response.questionChoices.filter((answer) => {
						return answer._id === answerId;
					});

					console.log("CORRECT ANSWER", correctAnswer);
					console.log("GIVEN ANSWER", givenAnswer);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

});

module.exports = router;