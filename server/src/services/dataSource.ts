import { DataSource } from 'typeorm'
// import { Estudiante } from './models/Estudiante'

const { HOST, PORT, USERNAME, PASSWORD, DATABASE } = process.env

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  // entities: [Alumno],
  synchronize: true,
  logging: false
})
