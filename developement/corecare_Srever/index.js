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
import records from './routes/recordsRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';
import accesskeyRoutes from './routes/accesskeyRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import previousPatientsRoutes from './routes/previousPatientsRoutes.js';
import verification from './routes/verification.js';
import apiDocumentation from './API/API_Documentaion.js';
import checkDocsAuthenticity from './routes/checkDocsAuthenticity.js'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'AI-Driven Blockchain Platform for Enhanced Patient Records Management',
        version: '1.0.0',
        description: 'API documentation for patient records management system',
    },
    servers: [
        {
            url: 'http://127.0.0.1:4000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./API/API_Documentaion.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure CORS
app.use(cors());

app.use('/api', apiDocumentation);
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
app.use('/records', records);
app.use('/previouspatients', previousPatientsRoutes);
app.use('/diagnosis', diagnosisRoutes);
app.use('/results', resultRoutes);
app.use('/accesskey', accesskeyRoutes);
app.use('/ai', checkDocsAuthenticity);
app.use('/verification', verification);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
