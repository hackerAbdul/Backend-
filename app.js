const express = require('express');
const app = express();

const stockRoutes = require('./api/routes/stock');

app.use('/stock', stockRoutes);


module.exports = app;