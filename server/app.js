const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error')


app.use(express.json());

const products = require('./routers/product')

app.use(errorMiddleware)

app.use('/api/v1',products)


module.exports = app;