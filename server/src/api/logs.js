const { Router } = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const LogEntry = require('../models/LogEntry');
const TEST_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
</head>
<body>
    <form method="POST" action="/api/logs/test">
        <button type="submit">POST</button>
    </form>
</body>
</html>`
const router = Router();
router.get('/', (req, res, next) => {
    LogEntry.find()
    .then(entries => {
        res.json(entries);
    })
    .catch(err => {
        next(err);
    });
});

router.get('/test', (req, res) => {
    res.send(TEST_PAGE);
});

// router.post('/test', (req, res) => {
//     res.render('test-view');
// });
router.post('/test', (req, res, next) => {
    // console.log(req.body);
    // Lake victoria: -1.2598449,30.9796203
    //Mount Kilimanjaro -3.0674031,37.3468725
    const request = {
        title: 'Mountain Kilimanjaro',
        comments: 'This mountain realy is highest in Africa!',
        latitude: -3.0674031,
        longitude: 37.3468725, 
        rating: 9,
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffarm2.staticflickr.com%2F1439%2F553319065_0077cd253c_b.jpg&f=1&nofb=1',
        visitDate: '2020-10-12T12:45:52.651Z'
    }
    const logEntry = new LogEntry(req.body);
    logEntry.save()
    // LogEntry.deleteOne({_id: new ObjectId('5ffd8502aee4ef20b4d66aa7')})
    .then(entry => {
        res.json(entry);
        res.redirect('/');
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            res.status(422);
        }
        next(err);
    });
});

module.exports = router;