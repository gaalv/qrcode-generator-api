import { Router } from 'express'

import QRCodeController from '../controllers/QRCodeController'

const QRCodeRoutes = Router()

QRCodeRoutes.get('/', QRCodeController.index)

QRCodeRoutes.get('/:id', QRCodeController.show)

QRCodeRoutes.get('/slug/:slug', QRCodeController.showBySlug)

QRCodeRoutes.post('/', QRCodeController.store)

QRCodeRoutes.put('/:id', QRCodeController.update)

QRCodeRoutes.delete('/:id', QRCodeController.delete)

export { QRCodeRoutes }
