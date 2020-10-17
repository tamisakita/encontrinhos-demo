const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');

const router = express.Router();

router.get('/events', async (req, res) => {
  const { name } = req.query;

  const regex = new RegExp(name, 'i');

  const events = await Event.find({
    name: { $regex: regex },
  }).populate('owner');
  // console.log(events)

  res.json({ events });
});

module.exports = router;
