const express = require ('express');
const Event = require('../models/Event');
const protectedRoute = require('../middlewares/protectedRoutes');

const router = express.Router();

// 'home'route
router.use((protectedRoutes);

  router.get('/home', async (req, res) => { 
      res.render('home');// atualizar a rota depois no próximo pull request
  });

//creating 'new event' route

router.get('/newEventView', (req, res) => {
    res.render('newEventView'); // atualizar a rota depois no próximo pull request
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

res.redirect('/myEventsView');// atualizar a rota depois no próximo pull request
});

module.exports = router;

//'my events'route

router.get('/myEventsView', async (req, res) => { 
    try {
      const eventsData = await Event.find({$or: [{participantsId: req.session.currentUser._id}, {owner:req.session.currentUser._id} ]});

    
      res.render('myEventsView', { eventsData });// atualizar a rota depois no próximo pull request
    } catch (error) {
      console.log(error);
    }
  });
  
