const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const stockRoutes = require('./api/routes/stock');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user')

mongoose.connect('mongodb+srv://304CEM:'+ process.env.MONGO_ATLAS_PW +'@api-2ear1.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
        return res.status(200).json({});
    }
    next();
});

// Handling request routes
app.use('/stock', stockRoutes);
app.use('/orders', ordersRoutes)
app.use('/user', userRoutes)

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