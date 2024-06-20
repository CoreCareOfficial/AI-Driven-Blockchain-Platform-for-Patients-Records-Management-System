// app.js
import express from 'express';
import bodyParser from 'body-parser';
import patientRoutes from './routes/patientRoutes.js';
import loginRoutes from './routes/loginRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/patient', patientRoutes);
app.use('login', loginRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
