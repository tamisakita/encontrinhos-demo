const mongoose = require('mongoose');
const Event = require('../models/Event');

const mockEvent = [
    {
    name: 'Xadrez do Bairro',
    date: '06/12/2020',
    time: '14:00',
    duration: 2,
    location: 'Alameda Santos,549',
    participantsAmt: 9,
    owner: '5f7d0df409137e05912fe366',
    description: 'Um maravilhoso evento de Xadrez do bairro',

    },
];

mongoose
    .connect('mongodb://localhost/encontrinhos-database', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(x=> {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

        Event.insertMany(mockEvent)
            .then(insertedEvent => {
                console.log(`Inserted ${insertedEvent.length} event!!`);

                mongoose.connection.close();
            })
    })