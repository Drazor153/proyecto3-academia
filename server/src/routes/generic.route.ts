import express from 'express'
import * as genericController from '../controllers/generic.controller'

const router = express.Router()

router.get('/ping', genericController.ping)

export default router
