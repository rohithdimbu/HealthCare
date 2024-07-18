const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['none', 'custom', 'After 3 days', 'After a week', 'After 2 weeks', 'After a month'],
        required: true
    },
    customDate: {
        type: Date
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
