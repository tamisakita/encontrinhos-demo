const express = require ('express');
const { response } = require('../app');
const Event = require('../models/Event');

const router = express.Router();

router.get('/newEventView', (request, responde) => {
    response.render('newEventView');
});

router.post('/newEventView', (request, response)=> {
    const {name, date, time, duration, location, partcipantsAmt, description } = request.body;
})
module.exports = router;
