const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
},
});

module.exports = mongoose.model('Diagnosis', diagnosisSchema);
