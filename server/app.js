if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const router  = require('./router');
const errorHandlers = require('./middleware/errorHandlers')
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Using router
app.use(router)

// Using error handlers
app.use(errorHandlers)

module.exports = app;
