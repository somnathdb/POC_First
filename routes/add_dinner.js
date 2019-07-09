const express = require('express');
const router = express.Router();
const Dinner = require('../models/add_dinner');

router.get('/all_dinner', (req, res, next) => {
    Dinner.find()
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

router.post('/add_dinner', (req, res, next) => {

    const dinner= new Dinner({
        name: req.body.name,
        phone_number:req.body.phone_number,
        adults:req.body.adults,
        kids: req.body.kids,
        special_occassion: req.body.special_occassion
    });

    dinner
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Dinner Information Added Successfully...!',
                createDinner: dinner
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
});

module.exports = router;