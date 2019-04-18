const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:"GET request for stock"
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message:"POST request for stock"
    })
})

module.exports= router;