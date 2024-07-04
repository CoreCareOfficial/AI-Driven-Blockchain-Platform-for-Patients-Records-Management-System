// index.js
import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import loginRoutes from './routes/loginRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import healthcareProviderRoutes from './routes/healthcareProviderRoutes.js';
import healthInfoRoutes from './routes/healthInfoRoutes.js';
import socialMediaRoutes from './routes/socialMediaRoutes.js';
import allergiesRoutes from './routes/allergiesRoutes.js';
import medicationRouts from './routes/medecationRoutes.js';
import pastConditionRoutes from './routes/pastConditionRoutes.js';
import previousDoctorsRoutes from './routes/previousDoctorsRoutes.js';
import practiceInfoRoutes from './routes/praticeInfoRoutes.js';
import educationalInnfoRoutes from './routes/educationalInnfoRoutes.js';
import workHoursRoutes from './routes/workHoursRoutes.js';
import visitHoursRoutes from './routes/visitHoursRoutes.js';
import departmentsRoutes from './routes/departmentsRoutes.js';
import servicesRoutes from './routes/ServicesRoutes.js';
import emergencyContacts from './routes/emergencyContacts.js';
import verification from './routes/verification.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure CORS
app.use(cors());

app.use('/login', loginRoutes);
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/healthcareproviders', healthcareProviderRoutes);
app.use('/healthinfo', healthInfoRoutes);
app.use('/socialmedia', socialMediaRoutes);
app.use('/allergies', allergiesRoutes);
app.use('/medications', medicationRouts);
app.use('/pastconditions', pastConditionRoutes);
app.use('/previousdoctors', previousDoctorsRoutes);
app.use('/practiceinfo', practiceInfoRoutes);
app.use('/educationalinfo', educationalInnfoRoutes);
app.use('/workhours', workHoursRoutes);
app.use('/visithours', visitHoursRoutes);
app.use('/departments', departmentsRoutes);
app.use('/services', servicesRoutes);
app.use('/emergencycontacts', emergencyContacts);
app.use('/verification', verification);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
