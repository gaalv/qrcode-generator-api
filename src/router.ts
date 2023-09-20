import { Router } from 'express'
import { QRCodeRoutes } from './app/routes/QRCodeRoutes'

const router = Router()

router.use('/qrcodes', QRCodeRoutes)

export default router