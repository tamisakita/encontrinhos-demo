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
    res.render('protected-views/newEventView'); 
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

      res.render('protected-views/myEventsView' , { eventsData,loggedUser: req.session.currentUser});

    } catch (error) {
      console.log(error);
    }
  });

//Each eventPageView route

router.get('/eventPageView/:eventId', async( req, res)=> {
  try{
    const { eventId } = req.params;

    const eventDetail = await (await Event.findById(eventId)).populate('owner');

    res.render('protected-views/eventPageView', {eventDetail, loggedUser: req.session.currentUser});

  } catch(error){
    console.log(error);
  }

});

//Action from the button "Inscrever-se"

router.post('/home/:eventId/edit', async (req, res)=> {
  const { eventId } = req.params;
  const {  userId  } = req.session.currentUser._id;

  await Event.findById(eventId)
  .then (event => event.participantsId.push(userId))
  .then (event => event.save());
   
});

module.exports = router;