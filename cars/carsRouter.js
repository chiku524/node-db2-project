const express = require('express');
const knex = require('knex');
const db = require('../data/db-config');
const router = express.Router();


router.get('/', (req, res) => {
    db('cars')
        .then(specs => {
            res.json(specs);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve specs."})
        });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    db('cars').where({id}).first()
        .then(specs => {
            res.json(specs);
        })
        .catch(err => {
            res.status(500).json({message: "Failed to retrieve specs."});
        });
});

router.post('/', (req, res) => {
    const carData = req.body;

    db('cars').insert(carData)
        .then(ids => {
            db('cars').where({id: ids[0]})
            .then(newCar => {
                res.status(201).json(newCar);
            });
        })
        .catch(err => {
            res.status(500).json({message: "Failed to store data"});
        });
});

module.exports = router; 