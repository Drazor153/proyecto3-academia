import express from 'express'
import cors from 'cors'
import studentsRoute from './routes/students.routes'
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/students', studentsRoute)

export default app
