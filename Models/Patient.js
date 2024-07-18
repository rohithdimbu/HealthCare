const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    symptoms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Symptom'
    }],
    diagnosis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diagnosis'
    }],
    labTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabTest'
    }],
    drugPrescriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DrugPrescription'
    }],
    patientAdvice: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientAdvice'
    }],
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
});

module.exports = mongoose.model('Patient', patientSchema);
