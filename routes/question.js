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
});

router.post('/submit', function(req, res){
	console.log("REACHED FORM SUBMI");
	var a = Object.values(req.body);
	console.log(a[0]);
	
});

module.exports = router;