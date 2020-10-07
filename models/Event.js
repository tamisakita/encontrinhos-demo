const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    duration: {type: Number, required: true},
    location: {type: String, required: true},
    participantsAmt: {type: Number, required: true},
    owner: {type: mongoose.Types.ObjectId, ref:'User', required: false},
    description: {type: String, required: true},
    participantsId: [{type: mongoose.Types.ObjectId, ref:'User', required: false}],
},
{
    timestamps: true,

});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
