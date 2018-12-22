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
	console.log(req.session);
	console.log(req.session.username);
	var response = Object.values(req.body)[0];
	for (let index = 0; index < response.length; index++) {
		var element = response[index].split('_');
		var answerId = element[0];
		var questionId = element[1];
		if (answerId != "") {
			Question.findById({ _id: questionId }).exec()
				.then(response => {
					var correctAnswer = response.questionChoices.find((answer) => {
						return answer.isCorrect == true;
					});

					var givenAnswer = response.questionChoices.find((answer) => {
						var resp = Object.values(req.body)[0];
						var ans = resp[index].split('_')[0];
						return answer._id == ans;
					});

					if (correctAnswer._id === givenAnswer._id) {
						var session = req.session;
						var userId = session.userId;

						UserStat.findOne({ username : username }).exec()
							.then(user => {
								user.correct = user.correct + 1;
								user.attempted = user.attempted + 1;
							})
							.catch(error => {
								console.log(error);
							});

					} else {
						UserStat.findOne({ username : username }).exec()
							.then(user => {
								user.incorrect = user.incorrect + 1;
								user.attempted = user.attempted + 1;
							})
							.catch(error => {
								console.log(error);
							});
					}

				})
				.catch(error => {
					console.log(error);
				});
		} else {
			var session = req.session;
			var userId = session.userId;

			UserStat.findById(userId).exec()
				.then(user => {
					user.skipped = user.skipped + 1;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
	res.json({ success : true, message : "Analysis of test stored" });
});

module.exports = router;