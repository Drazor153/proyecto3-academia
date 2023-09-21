import express from 'express';
import cors from 'cors';
import studentsRoute from './routes/students.routes';
import gradesRoute from './routes/grades.routes';
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/students', studentsRoute);
app.use('/api/grades', gradesRoute);

export default app;
