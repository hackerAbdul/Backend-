const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sku: {type: String, required: true},
    name: {type: String, require: true},
    size: {type: String, require: true},
    colour: {type: String, require: true},
    quantity: {type: Number, require: true}
});

module.exports = mongoose.model('Stock', StockSchema);