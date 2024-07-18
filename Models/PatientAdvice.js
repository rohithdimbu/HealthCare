const mongoose = require('mongoose');

const patientAdviceSchema = new mongoose.Schema({
  advice: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
},
});

module.exports = mongoose.model('PatientAdvice', patientAdviceSchema);
