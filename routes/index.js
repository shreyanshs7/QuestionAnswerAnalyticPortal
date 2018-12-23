var express = require('express');
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

module.exports = router;
