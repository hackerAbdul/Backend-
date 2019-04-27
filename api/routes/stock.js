const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Stocks = require('../models/stocks');

router.get('/', (req, res, next) => {
    Stocks.find()
    .select('_id sku name price size colour quantity')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            stock: docs.map(doc => {
                return {
                    _id: doc._id,
                    sku: doc.sku,
                    name: doc.name,
                    size: doc.size,
                    colour: doc.colour,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET'
                    }
                }
            })
        }
        console.log(docs);
        res.status(200).json(response);
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
            message:"New stock successfully stored",
            createdStock: {
                _id: result._id,
                sku: result.sku,
                name: result.name,
                size: result.size,
                colour: result.colour,
                quantity: result.quantity,
                request: {
                    type: 'POST'
                }
            }
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
    .select('_id sku name price size colour quantity')
    .exec()
    .then(doc => {
        console.log("From Database", doc);
        if (doc){
            res.status(200).json({
                stock: doc
            });
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
        res.status(200).json({
            meesage: "Stock has been update successfully with new quanitty"
        })
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
        res.status(200).json({
            message: "Item has been successfully deleted"
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    })
});

module.exports= router;