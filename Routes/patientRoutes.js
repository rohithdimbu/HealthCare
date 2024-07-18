const express=require('express');
const router=express.Router();
const { createNewPatient, loginPatient } = require('../Controllers/Authz');
const { authz, isPatient } = require('../Middlewares/Authz');
const { createSymptoms, 
        createDiagnosis, 
        createLabTests,
        createDrugPrescription,
        createPatientAdvice,
        createAppointment
      } = require('../Controllers/PatientController');

router.post('/createpatient',createNewPatient);
router.post('/loginpatient',loginPatient);
router.post('/createsymptoms',authz,isPatient,createSymptoms);
router.post('/creatediagnosis',authz,isPatient,createDiagnosis);
router.post('/createlabtestes',authz,isPatient,createLabTests);
router.post('/createdrugprescription',authz,isPatient,createDrugPrescription);
router.post('/patientadvice',authz,isPatient,createPatientAdvice);
router.post('/createappointment',authz,isPatient,createAppointment);

module.exports=router;