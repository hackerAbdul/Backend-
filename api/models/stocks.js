const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    size: String,
    colour: String,
    quantity: Number
});

module.exports = mongoose.model('Stock', StockSchema);