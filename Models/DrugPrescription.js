const mongoose = require('mongoose');

const drugPrescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  category: {
    type: String, // e.g., 'Suggested', 'Frequently Searched'
  },
  mealInstruction: {
    type: String, // e.g., 'After meal', 'Before meal'
    enum: ['After meal', 'Before meal'],
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

module.exports = mongoose.model('DrugPrescription', drugPrescriptionSchema);
