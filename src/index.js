/**
 * @file index.js is entry file 
 * @description Create and start webserver to run the api
 */

const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const cors = require('cors');
const logger = require('./common/log');

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const allowOrigin = process.env.ALLOW_ORIGIN;

const corsOptions = {
    origin: allowOrigin,
    optionsSuccessStatus: 200
}

const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '50mb', extended: true }))

app.use(cors(corsOptions));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./routes')(app, router);
PORT = process.env.PORT || 5000;

const db = require('./common/mongodb');

app.listen(PORT, () => {

    db.connect((err) => {
        if (err) {
            logger.error('Unable to connect database');
            process.exit();
        } else {
            logger.info('Connected to database!')
            logger.info(`Listening on port ${PORT}`);
        }
    })
})