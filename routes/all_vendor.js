const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendor');


router.get('/all_vendor', (req, res, next) => {
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

//   Get Data By UserName

router.get('/:username', (req, res, next) => {
    const username = req.params.username;
    Vendor.find({username:username})
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:err});
        });
});

// Get Data By UserName End

router.patch('/:vendorId', (req, res, next) => {
    const id = req.params.vendorId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Vendor.update({ _id: id }, { $set:updateOps })
        .exec()
        .then(result => {
            // console.log(result)
            res.status(200), json({message:'Update SuccessFully..!'});
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ message:'Update Not SuccessFully..!'});
        });
});

module.exports = router;