import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import studentsRoute from './routes/students.routes';
import levelsRoute from './routes/levels.routes';
import teacherRoute from './routes/teachers.routes';
// import classesRoute from './routes/classes.routes'

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/students', studentsRoute);
app.use('/api/levels', levelsRoute);
app.use('/api/teachers', teacherRoute);
// app.use('/api/classes', classesRoute)

export default app;
