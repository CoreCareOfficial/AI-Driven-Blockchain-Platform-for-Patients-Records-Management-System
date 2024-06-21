// app.js
import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import loginRoutes from './routes/loginRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/patients', patientRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
