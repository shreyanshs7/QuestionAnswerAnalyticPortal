var express = require('express');
var Question = require('../models/question');
var router = express.Router();

router.get('/', function (req, res) {
	Question.find({}).exec()
	.then(response => {
		res.render('questions', { questions : response });
	})
	.catch(error => {
		console.log(error);
	});
	
	res.render()
});

module.exports = router;