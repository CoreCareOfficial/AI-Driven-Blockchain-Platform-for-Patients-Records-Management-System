// index.js
import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import loginRoutes from './routes/loginRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/login', loginRoutes);
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
