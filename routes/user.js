var express = require('express');
var router = express.Router();
// var passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('user/profile');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});


router.use('/', notisLoggedIn, function (req, res, next) {
    next();
});


// router.get('/signin', function (req, res, next) {
//     var messages = req.flash('error');
//     res.render('user/signin', { csrfToken: req.csrfToken() });
// });

// router.post('/signin', passport.authenticate('local.signin', {
//     successRedirect: '/user/profile',
//     failuerRedirect: '/user/signin',
//     failuerFlash: true
// }));

router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
            return  res.status(400).json({email:'Email already Exists'});
            }
            else{
                const newUser = new User({
                    email:req.body.email,
                    password:req.body.password
                });
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err =>console.log(err));
                    })
                })
            }
        })

});



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
function notisLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}