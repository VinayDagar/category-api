process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const app = express();

global.express = express;
global.app = app;

global.configHolder = require('./config/dependency-include');
require('./config/init')
const categoryRoutes = require('./config/routes/category');

app.use('/api/v1/category', categoryRoutes)

app.get('/', (req, res) => res.status(200).send('Server is running'));

app.use((error, req, res, next) => {
    console.error('Error ', { error })

    if (error instanceof Validate.ValidationError) {
        error = views.ErrorView({ status: error.statusCode, message: error.details.body[0].message })
        return res.status(error.status).json(error)
    }

    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong';

    error = views.ErrorView({ status, message })
    return res.status(error.status).json(error)
})
