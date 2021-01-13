const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const logs = require('./api/logs');
const { notFound, errorHandler } = require('./middlewares');

const app = express();

mongoose.connect('mongodb://localhost/travel-log', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to mongoose!'))
.catch(err => {
    console.log('Failed to connect to mongoose!');
    console.log(err);
});
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res, next) => {
    res.json({
        message: 'HELLO WORKD!'
    });
});

app.use('/api/logs', logs);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});