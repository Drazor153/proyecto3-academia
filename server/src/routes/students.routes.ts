import { Router } from 'express'
import * as genericController from '../controllers/students.controller'

const router = Router()

router.get('/ping', genericController.ping)

export default router
