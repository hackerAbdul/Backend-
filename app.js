const express = require('express');
const app = express();
const morgan = require('morgan');



const stockRoutes = require('./api/routes/stock');
const ordersRoutes = require('./api/routes/orders');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handling request routes
app.use('/stock', stockRoutes);
app.use('/orders', ordersRoutes)

app.use((req,res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;