const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isRepeat: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('LabTestes', labTestSchema);
