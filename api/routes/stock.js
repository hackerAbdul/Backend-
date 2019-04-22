const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:"GET request for stock"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message:"POST request for stock"
    })
});

router.get('/:SKU', (req, res, next) => {
    const id = req.params.SKU;
    if (id === 'new'){
        res.status(200).status({
            message: "special id",
            id: id
        });
    } else {
        res.status(200).json({
            message: 'you passed id'
        });
    }
});

router.patch('/:SKU', (req, res, next) => {
    res.status(200).json({
        message: "updated product"
    });
});

router.delete('/:SKU', (req, res, next) => {
    res.status(200).json({
        message: "deleted product"
    });
});

module.exports= router;