var express = require('express');
var User = require('../models/user');
var userStat = require('../models/statistics');
var bcrypt = require('bcryptjs');
var router = express.Router();

router.post('/register', function (req, res) {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;

  var user = new User({
    name: name,
    username: username,
    password: password
  });
  user.save(function (err) {
    if (err) throw err;
  });
  User.findOne({ username: username }).exec()
    .then(response => {
      var newUserStat = new userStat({
        user: username,
      });
      newUserStat.save((err) => {
        if (err) throw err;
      });
    })
    .catch(error => {
      console.log(error);
    });
  res.json({ success: true, message: "User registered" });
});

router.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username }).exec().then(user => {
    if (!user) {
      res.json({ success: false, message: "No user with username found" });
    }
    var response = bcrypt.compareSync(password, user.password, function(err, resp){
      return resp;
    })
    if (!response) {
      res.json({ success: false, message: "Invalid password" });
    }
    else {
      var session = req.session;
      session.username = user.username;
      res.json({ success: true, message: "User authenticated" });
    }
  })
    .catch(err => {
      console.log("ERROR ", err);
    });
});

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    else res.redirect('/');
  });
});

router.get('/login', function (req, res) {
  if (req.session.username) {
    User.findOne({ username: req.session.username }).exec()
      .then(user => {
        userStat.findOne({ user: req.session.username }).exec()
          .then(stats => {
            res.render('profile', { user: user, stats: stats });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
  else
    res.render('login');
});

router.get('/register', function (req, res) {
  res.render('register');
});

router.get('/profile', function (req, res) {
  if (req.session.username) {
    User.findOne({ username: req.session.username }).exec()
      .then(user => {
        userStat.findOne({ user : req.session.username }).exec()
          .then(stats => {
            res.render('profile', { user: user, stats: stats });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
  else
    res.render('login');
});

router.post('/update', function(req, res){
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username : req.session.username }).exec()
  .then(user => {
    user.name = name;
    user.username = username;
    user.password = password;

    req.session.username = username;

    user.save(function(err){
      if(err) throw err;
      res.json({ success : true, message : "User details updated" })
    });
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;
