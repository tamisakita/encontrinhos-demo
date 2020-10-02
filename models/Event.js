const moongoose = require('mongoose');

const { Schema } = moongoose;

const participantList = new Schema({
    type: moongoose.Types.ObjectId, ref:'User', required: false
})

const eventSchema = new Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    duration: {type: Number, required: true},
    location: {type: String, required: true},
    participantsAmt: {type: Number, required: true},
    owner: {type: moongoose.Types.ObjectId, ref:'User', required: false},
    description: {type: String, required: true},
    participantsId: {type: [participantList], required: false},
},
{
    timestamps: true,

});

const Event = mongoose.model('user', userSchema);

module.exports = Event;
