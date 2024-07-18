const Patient=require('../Models/Patient');
const Appointment=require('../Models/Appointement');
const Diagnosis=require('../Models/Diagnosis');
const DrugPrescription=require('../Models/DrugPrescription');
const LabTestes=require('../Models/LabTestes');
const PatientAdvice=require('../Models/PatientAdvice');
const Symptoms=require('../Models/Symptoms');


// create a new symptoms
exports.createSymptoms = async (req, res) => {
    try {
      // Get data from req's body
      const { name, 
              duration, 
              notes } = req.body;
  
      // Validate data
      if (!name || !duration || !notes) 
      {
        return res.status(400).json({
            success: false,
            message: "Missing fields"
        });
      }
  
      // Get patient ID and validate
      const userId = req.user.id;
      if (!userId) 
      {
        return res.status(400).json({
          success: false,
          message: "Patient ID is missing"
        });
      }
  
      // Count the frequency of this symptom
      const countFreq = await Symptoms.countDocuments({ name });

      let category = "Suggested";
      if (countFreq > 10) 
      category = "Frequently Searched";
  
      // Create new entry in symptoms
      const newSymptoms = await Symptoms.create({
        name,
        duration,
        notes,
        category,
        patient: userId,
      });
  
      // Update patient
      const updatedPatient = await Patient.findByIdAndUpdate(
        userId,
        { $push: { symptoms: newSymptoms._id } },
        { new: true }
      );
  
      // Return successful response
      return res.status(200).json({
        success: true,
        message: "Symptoms created successfully",
        updatedPatient,
        newSymptoms
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while creating new symptoms",
        error: error.message
      });
    }
  };


// create diagnosis
exports.createDiagnosis = async (req, res) => {
    try {
      // Get data from req's body
      const { name, notes } = req.body;
  
      // Validate data
      if (!name || !notes) {
        return res.status(400).json({
          success: false,
          message: "Missing fields"
        });
      }
  
      // Get patient ID and validate
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Patient ID is missing"
        });
      }
  
      // Count the frequency of this diagnosis
      const countFreq = await Diagnosis.countDocuments({ name });
  
      let category = "Suggested";
      if(countFreq > 10) 
      category = "Frequently Searched";
  
      // Create new entry in diagnosis
      const newDiagnosis = await Diagnosis.create({
        name,
        notes,
        category,
        patient: userId,
      });
  
      // Update patient
      const updatedPatient = await Patient.findByIdAndUpdate(
        userId,
        { $push: { diagnosis: newDiagnosis._id } },
        { new: true }
      );
  
      // Return successful response
      return res.status(200).json({
        success: true,
        message: "Diagnosis created successfully",
        updatedPatient,
        newDiagnosis
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while creating new diagnosis",
        error: error.message
      });
    }
};


// creating a new labtestes
exports.createLabTests = async (req, res) => {
    try {
      // Get data from req's body
      const labTestsArray = req.body;
  
      // Validate data
      if (!Array.isArray(labTestsArray) || labTestsArray.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Lab tests array is missing or empty"
        });
      }
  
      // Get patient ID and validate
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Patient ID is missing"
        });
      }
  
      // Process each lab test entry
      const newLabTests = await Promise.all(labTestsArray.map(async (labTest) => {
        const { name, isRepeat, notes } = labTest;
  
        // Validate individual lab test fields
        //console.log(labTest);
        if (!name || !isRepeat || !notes) {
          throw new Error("Missing fields in one of the lab test entries");
        }
  
        // Create new entry in lab tests
        const newLabTest = await LabTestes.create({
          name,
          isRepeat,
          notes,
          patient: userId,
        });
  
        return newLabTest._id;
      }));
  
      // Update patient
      const updatedPatient = await Patient.findByIdAndUpdate(
        userId,
        { $push: { labTests: { $each: newLabTests } } },
        { new: true }
      );
  
      // Return successful response
      return res.status(200).json({
        success: true,
        message: "Lab tests created successfully",
        updatedPatient,
        newLabTests
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while creating new lab tests",
        error: error.message
      });
    }
};



// create drug prescription
exports.createDrugPrescription = async (req, res) => {
    try {
      // Get data from req's body
      const { name, 
              dosage, 
              duration, 
              frequency, 
              mealInstruction, 
              notes } = req.body;
  
      // Validate data
      if (!name || !dosage || !duration || !frequency || !mealInstruction || !notes) {
        return res.status(400).json({
          success: false,
          message: "Missing fields"
        });
      }
  
      // Get patient ID and validate
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Patient ID is missing"
        });
      }
  
      // Create new entry in drug prescriptions
      const newDrugPrescription = await DrugPrescription.create({
        name,
        dosage,
        duration,
        frequency,
        mealInstruction,
        notes,
        patient: userId,
      });
  
      // Update patient
      const updatedPatient = await Patient.findByIdAndUpdate(
        userId,
        { $push: { drugPrescriptions: newDrugPrescription._id } },
        { new: true }
      );
  
      // Return successful response
      return res.status(200).json({
        success: true,
        message: "Drug prescription created successfully",
        updatedPatient,
        newDrugPrescription
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while creating new drug prescription",
        error: error.message
      });
    }
  };


// create patient advice
exports.createPatientAdvice = async (req, res) => {
    try {
      // Get data from req's body
      const { advice, notes } = req.body;
  
      // Validate data
      if (!advice) {
        return res.status(400).json({
          success: false,
          message: "Missing fields"
        });
      }
  
      // Get patient ID and validate
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Patient ID is missing"
        });
      }
  
      // Create new entry in patient advice
      const newPatientAdvice = await PatientAdvice.create({
        advice,
        notes,
        patient: userId,
      });
  
      // Update patient
      const updatedPatient = await Patient.findByIdAndUpdate(
        userId,
        { $push: { patientAdvice: newPatientAdvice._id } },
        { new: true }
      );
  
      // Return successful response
      return res.status(200).json({
        success: true,
        message: "Patient advice created successfully",
        updatedPatient,
        newPatientAdvice
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while creating new patient advice",
        error: error.message
      });
    }
};



// create an appointement
exports.createAppointment = async (req, res) => {
    try {
      // Get data from req's body
      const { time, customDate } = req.body;
  
      // Validate data
      if (!time) {
        return res.status(400).json({
          success: false,
          message: "Time is missing"
        });
      }
  
      // Get patient ID and validate
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Patient ID is missing"
        });
      }
  
      // Initialize appointment date
      let appointmentDate;
  
      // Calculate appointment date based on time option
      const today = new Date();
      switch (time) {
        case "none":
          return res.status(200).json({
            success: true,
            message: "No follow-up appointment is needed. Hope you have a speedy recovery"
          });
        case "custom":
          if (!customDate) {
            return res.status(400).json({
              success: false,
              message: "Custom date is missing"
            });
          }
          appointmentDate = new Date(customDate);
          break;
        case "After 3 days":
          appointmentDate = new Date(today.setDate(today.getDate() + 3));
          break;
        case "After a week":
          appointmentDate = new Date(today.setDate(today.getDate() + 7));
          break;
        case "After 2 weeks":
          appointmentDate = new Date(today.setDate(today.getDate() + 14));
          break;
        case "After a month":
          appointmentDate = new Date(today.setMonth(today.getMonth() + 1));
          break;
        default:
          return res.status(400).json({
            success: false,
            message: "Invalid time option"
          });
      }
  
      // Create new appointment entry
      const newAppointment = await Appointment.create({
        patient: userId,
        appointmentDate,
        type: time,
        customDate: time === 'custom' ? new Date(customDate) : null
      });
  
      // Update patient
      const updatedPatient = await Patient.findByIdAndUpdate(
        userId,
        { $push: { appointments: newAppointment._id } },
        { new: true }
      );
  
      // Return successful response
      return res.status(200).json({
        success: true,
        message: "Appointment created successfully",
        appointmentDate,
        updatedPatient
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while creating appointment",
        error: error.message
      });
    }
  };