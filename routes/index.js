var express = require('express');
var userStat = require('../models/statistics');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var session = req.session;
  if(session.username) {
    res.render('profile');
  }
  else
      res.render('index');
});

router.get('/leaderboard', function(req, res){
  userStat.find({}).sort("-points").exec()
  .then(response => {
    res.render('leaderboard', { data : response });
  })
  .catch(err => {
    console.log(err);
  })
});

module.exports = router;
