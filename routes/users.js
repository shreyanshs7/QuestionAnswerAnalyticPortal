var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.post('/register', function(req, res) {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;

  var user = new User({
    name : name,
    username : username,
    password : password
  });
  user.save(function(err){
    if(err) throw err;
    res.json({ success : true, message : "User registered" });
  });
});

router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username : username }).exec().then(user => {
    if(!user) {
      res.json({ success : false, message : "No user with username found" });
    }
    if(!user.validatePassword(password, user.password)) {
      res.json({ success : false, message : "Invalid password" });
    }
    else
      res.json({ success : true, message : "User authenticated"});
  })
  .catch(err => {
    console.log("ERROR ", err);
  });
});

module.exports = router;
