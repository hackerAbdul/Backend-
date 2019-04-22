const express = require('express');
const app = express();

const stockRoutes = require('./api/routes/stock');
const ordersRoutes = require('./api/routes/orders');

// Handling request routes
app.use('/stock', stockRoutes);
app.use('/orders', ordersRoutes)

module.exports = app;