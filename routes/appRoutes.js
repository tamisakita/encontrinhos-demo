const express = require('express');
const Event = require('../models/Event');
const protectedRoute = require('../middlewares/protectedRoutes');

const router = express.Router();

// 'home'route
router.use(protectedRoute);

router.get('/home', (req, res) => {
  res.render('protected-views/home', { loggedUser: req.session.currentUser });
});

//creating 'new event' route

router.get('/newEventView', (req, res) => {
    res.render('protected-views/newEventView'); 
});

router.post('/newEventView', async (req, res)=> {
    const {name, date, time, duration, location, partcipantsAmt, description } = request.body;

    const newEvent = new Event({
    name: name,
    date: date,
    time: time,
    duration: duration,
    location: location,
    participantsAmt:partcipantsAmt,
    description: description, 
    owner: req.session.current._id, 
});

await newEvent.save();

res.redirect('/protected-views/myEventsView');
});

//'my events'route

router.get('/myEventsView', async (req, res) => { 
    try {
      const eventsData = await Event.find({$or: [{participantsId: req.session.currentUser._id}, {owner:req.session.currentUser._id} ]});

    
      res.render('protected-views/myEventsView' , { eventsData });
    } catch (error) {
      console.log(error);
    }
  });
  
module.exports = router;
