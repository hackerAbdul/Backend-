const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-authentication')

const Orders = require('../models/orders')

router.get('/', (req, res, next) => {
    Orders.find()
    .select('quantity _id stock')
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    const order = new Orders({
        _id: mongoose.Types.ObjectId(),
        stock: req.body.stockId,
        quanitity: req.body.quanitity
        
    });
    order
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

router.get('/:orderId', (req, res, next) => {
    Orders.findById(req.params.orderId)
    .select('quantity _id stock')
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: 'Order cannot be found',
            });
        }
        res.status(200).json({
            order: order
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
    Orders.remove({_id: req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order has been deleted successfully'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;