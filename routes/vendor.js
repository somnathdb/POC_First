const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Vendor = require('../models/vendor');
const keys = require('../config/passport');


router.get('/add_vendor', (req, res, next) => {
    Vendor.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.post('/signup', (req, res) => {
    Vendor.findOne({ username: req.body.username })
        .then(vendor => {
            if (vendor) {
                return res.status(400).json({ username: 'Username already Exists' });
            }
            else {
                const newVendor = new Vendor({
                    vendor_name: req.body.vendor_name,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                    username: req.body.username,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newVendor.password, salt, (err, hash) => {
                        if (err) throw err;
                        newVendor.password = hash;
                        newVendor.save()
                            .then(vendor => res.json(vendor))
                            .catch(err => console.log(err));
                    })
                })
            }
        })

});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Vendor.findOne({ username }).then(vendor => {
        if (!vendor) {
            return res.status(404).json({ username: 'username not found' });
        }
        bcrypt.compare(password,vendor.password).then(isMatch => {
            if (isMatch) {
                const payload = {id:vendor.id,username:vendor.username,password:vendor.password,vendor_name:vendor.vendor_name}
                jwt.sign(payload,keys.secretOrkey,{expiresIn:3600},(err,token)=>{
                    res.json({
                        success:true,
                        token:'Bearer' +token
                    })
                });
            }
            else {
                return res.status(400).json({ password: 'password Incurrect' });
            }
        });
    });
});
// router.post('/add_vendor', (req, res, next) => {
//     Vendor.find({ username: req.body.username })
//         .exec()
//         .then(username => {
//             if (username.length >= 1) {
//                 return res.status(409).json({
//                     message: 'Username Exists'
//                 });
//             } else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(500).json({
//                             error: err
//                         });
//                     }
//                     else {
//                         const vendor = new Vendor({
//                             vendor_name: req.body.vendor_name,
//                             email: req.body.email,
//                             phone_number: req.body.phone_number,
//                             address: req.body.address,
//                             username: req.body.username,
//                             password: hash
//                         });
//                         vendor
//                             .save()
//                             .then(result => {
//                                 console.log(result);
//                                 res.status(201).json({
//                                     message: 'Vendor Added Successfully...!',
//                                     // createVendor: vendor
//                                 });
//                             })
//                             .catch(err => {
//                                 console.log(err);
//                                 res.status(500).json({ error: err });
//                             });
//                     }
//                 })

//             }
//         })

// });

// router.post('/login_vendor', (req, res, next) => {
//     Vendor.find({ username: req.body.username })
//         .exec()
//         .then(username => {
//             if (username.length < 1) {
//                 return res.status(401).json({
//                     message: 'Auth Failed'
//                 });
//             }
//             bcrypt.compare(req.body.password, username[0].password, (err, result) => {
//                 if (err) {
//                     return res.status(401).json({
//                         message: 'Auth Failed'
//                     });
//                 }
//                 if (result) {
//                     return res.status(200).json({
//                         message: 'Auth Successful'
//                     });
//                 }
//                 res.status(401).json({
//                     message: 'Auth Failed'
//                 });
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// });


module.exports = router;

