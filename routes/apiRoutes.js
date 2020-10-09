const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

router.get('/events/:name', async (req, res) => {
  const { name } = req.params;

  const regex = new RegExp(name, 'i');

  const events = await Event.find({
    name: { $regex: regex },
  });

  res.json({ events });
});

module.exports = router;
