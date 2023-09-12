import express from 'express'
import cors from 'cors'
import genericRoute from './routes/generic.route'
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.get('/ping', (_req, res) => {
  console.log('hola ' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/generic', genericRoute)

export default app
