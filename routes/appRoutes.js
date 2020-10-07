const express = require('express');
const Event = require('../models/Event');
const protectedRoute = require('../middlewares/protectedRoutes');
const { request } = require('express');

const router = express.Router();

// 'home'route
router.use(protectedRoute);

router.get('/home', (req, res) => {
  res.render('protected-views/home', { loggedUser: req.session.currentUser });
});

//creating 'new event' route

router.get('/newEventView', (req, res) => {
    res.render('protected-views/newEventView', { loggedUser: req.session.currentUser }); 
});

router.post('/newEventView', async (req, res)=> {
    const {name, date, time, duration, location, participantsAmt, description } = req.body;
    
    const {currentUser} = req.session;

    const newEvent = new Event({
    name: name,
    date: date,
    time: time,
    duration: duration,
    location: location,
    participantsAmt:participantsAmt,
    description: description, 
    owner: currentUser._id, 
});

await newEvent.save();

res.redirect('protected-views/myEventsView');
});

//'my events'route

router.get('/myEventsView', async (req, res) => { 
    try {
      const eventsData = await Event.find({ $or: [{participantsId: { $in: [req.session.currentUser._id] }}, {owner:req.session.currentUser._id}]}).populate('owner');
    
      res.render('protected-views/myEventsView' , { eventsData });

    } catch (error) {
      console.log(error);
    }
  });
  
module.exports = router;

router.get('/newEventView', (req, res) => { 

  res.render('protected-views/newEventView', { loggedUser: req.session.currentUser });

});


//Each eventPageView route

router.get('/eventPageView/:eventId', async( req, res)=> {
  try{
    const { eventId } = req.params;

    const eventDetail = await Event.findById(eventId);

    res.render('protected-views/eventPageView', eventDetail, { loggedUser: req.session.currentUser });

  } catch(error){
    console.log(error)
  }

});
