import express from 'express';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication operations
 *   - name: Patients
 *     description: Patient management
 *   - name: Doctors
 *     description: Doctor management
 *   - name: Healthcare Providers
 *     description: Healthcare provider management
 *   - name: Records
 *     description: Patient records management
 *   - name: Prescriptions
 *     description: Prescription management
 *   - name: Verification
 *     description: Email verification
 * 
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     RegistrationDetails:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - userType
 *         - username
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         userType:
 *           type: string
 *         username:
 *           type: string
 *     PatientDetails:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         country:
 *           type: string
 *         phoneNumber:
 *           type: string
 *     HealthInfo:
 *       type: object
 *       properties:
 *         bloodtype:
 *           type: string
 *         weight:
 *           type: number
 *         height:
 *           type: number
 *         allergies:
 *           type: string
 *     DoctorDetails:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         specialization:
 *           type: string
 *         licenseNumber:
 *           type: string
 *     HealthcareProviderDetails:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         address:
 *           type: string
 *         licenseNumber:
 *           type: string
 *     PrescriptionDetails:
 *       type: object
 *       properties:
 *         patientid:
 *           type: string
 *         doctorid:
 *           type: string
 *         diagnosis:
 *           type: string
 *         notes:
 *           type: string
 *         prescribedMedicine:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               medicineName:
 *                 type: string
 *               dosage:
 *                 type: string
 *               notes:
 *                 type: string
 *         prescribedLabTests:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *         prescribedXrays:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *         labTestsNotes:
 *           type: string
 *         radiologyNotes:
 *           type: string
 *         nextVisitDate:
 *           type: string
 *           format: date
 *         nextVisitReason:
 *           type: string
 */

/**
 * @swagger
 * /login/add:
 *   post:
 *     summary: Register a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationDetails'
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /login/get:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userType:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Invalid username or password
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient record
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               patientDetails:
 *                 $ref: '#/components/schemas/PatientDetails'
 *               personalPhoto:
 *                 type: string
 *                 format: binary
 *               FIDCardPhoto:
 *                 type: string
 *                 format: binary
 *               BIDCardPhoto:
 *                 type: string
 *                 format: binary
 *               passportDocument:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patientID:
 *                   type: string
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /patients/{patientID}:
 *   get:
 *     summary: Get patient details by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientDetails'
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /patients/general/{patientID}:
 *   put:
 *     summary: Update general information of a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientDetails'
 *     responses:
 *       200:
 *         description: Patient information updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /patients/healthinfo/{patientID}:
 *   put:
 *     summary: Update health information of a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: patientID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthInfo'
 *     responses:
 *       200:
 *         description: Health information updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor record
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               doctorDetails:
 *                 $ref: '#/components/schemas/DoctorDetails'
 *               licenseDocument:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Doctor created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /doctors/{patientID}:
 *   get:
 *     summary: Get doctor details by associated patient ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: patientID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorDetails'
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /doctors/updateprofissionalinfo/{doctorID}:
 *   put:
 *     summary: Update professional information of a doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: doctorID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorDetails'
 *     responses:
 *       200:
 *         description: Doctor information updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /healthcareproviders:
 *   post:
 *     summary: Create a new healthcare provider record
 *     tags: [Healthcare Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               providerDetails:
 *                 $ref: '#/components/schemas/HealthcareProviderDetails'
 *               licenseDocument:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Healthcare provider created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /healthcareproviders:
 *   get:
 *     summary: Get healthcare provider details by email
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Healthcare provider details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthcareProviderDetails'
 *       404:
 *         description: Healthcare provider not found
 */

/**
 * @swagger
 * /healthcareproviders/updatehealthcareprovider/{emailorusername}:
 *   put:
 *     summary: Update healthcare provider information
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: path
 *         name: emailorusername
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthcareProviderDetails'
 *     responses:
 *       200:
 *         description: Healthcare provider information updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Healthcare provider not found
 */

/**
 * @swagger
 * /records/{patientid}:
 *   get:
 *     summary: Get all records for a specific patient
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: patientid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   recordID:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   diagnosis:
 *                     type: string
 *                   doctorName:
 *                     type: string
 *       404:
 *         description: No records found for the patient
 */

/**
 * @swagger
 * /prescription:
 *   post:
 *     summary: Create a new prescription and associated records
 *     tags: [Prescriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrescriptionDetails'
 *     responses:
 *       200:
 *         description: Prescription created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /verification:
 *   post:
 *     summary: Send a verification code to the provided email
 *     tags: [Verification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification code sent successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /verification/verify-code:
 *   post:
 *     summary: Verify the code sent to the email
 *     tags: [Verification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code verified successfully
 *       400:
 *         description: Invalid code
 */

/**
 * @swagger
 * /patients/personalphoto/{username}:
 *   put:
 *     summary: Update a patient's personal photo
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               personalPhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Personal photo updated successfully
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /patients/getpatientinfo/{emailorusername}:
 *   get:
 *     summary: Get comprehensive patient information
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: emailorusername
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patientInfo:
 *                   $ref: '#/components/schemas/PatientDetails'
 *                 healthInfo:
 *                   $ref: '#/components/schemas/HealthInfo'
 *                 allergies:
 *                   type: object
 *                 socialMedia:
 *                   type: array
 *                   items:
 *                     type: object
 *                 emergencyContacts:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /patients/newemergencycontact/{emailorusername}:
 *   post:
 *     summary: Add a new emergency contact for a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: emailorusername
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chosenUserEmail
 *             properties:
 *               chosenUserEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Emergency contact added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /patients/deleteemergencycontact/{emailorusername}:
 *   delete:
 *     summary: Delete an emergency contact for a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: emailorusername
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chosenUserEmail
 *             properties:
 *               chosenUserEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Emergency contact deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Emergency contact not found
 */

/**
 * @swagger
 * /healthcareproviders/facilityphoto:
 *   put:
 *     summary: Update facility photo for a healthcare provider
 *     tags: [Healthcare Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               facilityPhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Facility photo updated successfully
 *       404:
 *         description: Healthcare provider not found
 */

/**
 * @swagger
 * /healthcareproviders/gethealtcareinfo/{emailorusername}:
 *   get:
 *     summary: Get comprehensive healthcare provider information
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: path
 *         name: emailorusername
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Healthcare provider information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 healthcareProviderInfo:
 *                   $ref: '#/components/schemas/HealthcareProviderDetails'
 *                 departments:
 *                   type: array
 *                   items:
 *                     type: object
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                 facilitySocialMedia:
 *                   type: array
 *                   items:
 *                     type: object
 *                 ficilityWorkHours:
 *                   type: array
 *                   items:
 *                     type: object
 *                 visitHours:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Healthcare provider not found
 */

/**
 * @swagger
 * /healthcareproviders/updatedepartments/{healthcareid}:
 *   put:
 *     summary: Update departments for a healthcare provider
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: path
 *         name: healthcareid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     value:
 *                       type: string
 *               newDepartment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departments updated successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /healthcareproviders/updateservices/{healthcareid}:
 *   put:
 *     summary: Update services for a healthcare provider
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: path
 *         name: healthcareid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               services:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     value:
 *                       type: string
 *               newService:
 *                 type: string
 *     responses:
 *       200:
 *         description: Services updated successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /workhours/{email}:
 *   get:
 *     summary: Get work hours for a healthcare provider
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work hours retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hospitalName:
 *                     type: string
 *                   workDays:
 *                     type: string
 *                   DayworkHours:
 *                     type: string
 *                   NightworkHours:
 *                     type: string
 *       400:
 *         description: Not found
 */

/**
 * @swagger
 * /workhours:
 *   post:
 *     summary: Add work hours for a healthcare provider
 *     tags: [Healthcare Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               hospitalName:
 *                 type: string
 *               workDays:
 *                 type: string
 *               DayworkHours:
 *                 type: string
 *               NightworkHours:
 *                 type: string
 *     responses:
 *       200:
 *         description: Work hours added successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /workhours/{id}:
 *   put:
 *     summary: Update work hours for a healthcare provider
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalName:
 *                 type: string
 *               workDays:
 *                 type: string
 *               DayworkHours:
 *                 type: string
 *               NightworkHours:
 *                 type: string
 *     responses:
 *       200:
 *         description: Work hours updated successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /visithours/{email}:
 *   get:
 *     summary: Get visit hours for a healthcare provider
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visit hours retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hospitalName:
 *                     type: string
 *                   visitDays:
 *                     type: string
 *                   DayvisitHours:
 *                     type: string
 *                   NightvisitHours:
 *                     type: string
 *       400:
 *         description: Not found
 */

/**
 * @swagger
 * /visithours:
 *   post:
 *     summary: Add visit hours for a healthcare provider
 *     tags: [Healthcare Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               hospitalName:
 *                 type: string
 *               visitDays:
 *                 type: string
 *               DayvisitHours:
 *                 type: string
 *               NightvisitHours:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visit hours added successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /visithours/{id}:
 *   put:
 *     summary: Update visit hours for a healthcare provider
 *     tags: [Healthcare Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalName:
 *                 type: string
 *               visitDays:
 *                 type: string
 *               DayvisitHours:
 *                 type: string
 *               NightvisitHours:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visit hours updated successfully
 *       400:
 *         description: Bad request
 */

export default router;