const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stock: {type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Order', OrdersSchema);