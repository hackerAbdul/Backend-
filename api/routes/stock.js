const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Stocks = require('../models/stocks');

router.get('/', (req, res, next) => {
    Stocks.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    const stock = new Stocks({
        _id: new mongoose.Types.ObjectId(),
        sku: req.body.sku,
        name: req.body.name,
        size: req.body.size,
        colour: req.body.colour,
        quantity: req.body.quantity
    });
    stock
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:"New stock Posted",
            createdStock: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    
});

router.get('/:SKU', (req, res, next) => {
    const id = req.params.SKU;
    Stocks.findById(id)
    .exec()
    .then(doc => {
        console.log("From Database", doc);
        if (doc){
            res.status(200).json(doc);
        } else{
            res.status(404).json({
                message: "No valid entrance for provided Id"
            })
        }
        res.status(200)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    })
});

router.patch('/:SKU', (req, res, next) => {
    const id = req.params.SKU
    Stocks.update({_id: id}, { $set: { quantity: req.body.newQuantity}})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    })
});

router.delete('/:SKU', (req, res, next) => {
    const id = req.params.SKU
    Stocks.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    })
});

module.exports= router;