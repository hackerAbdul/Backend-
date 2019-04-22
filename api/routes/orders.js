const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "orders fetched"
    });
});

router.post('/', (req, res, next) => {
    const order = {
        SKU: req.body.SKU,
        OrderQuantity: req.body.OrderQuantity
    }
    res.status(201).json({
        message: "order was created ",
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "order details",
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "order deleted",
        orderId: req.params.orderId
    });
});

module.exports = router;