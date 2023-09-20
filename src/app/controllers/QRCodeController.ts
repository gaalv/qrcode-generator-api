import { Request, Response } from "express";

import QRCodeService from '../services/QRCodeService';

class QRCodeController {

  async index(req: Request, res: Response) {
    try {
      const QRCodeList = await QRCodeService.listQRCodes()

      return res.json(QRCodeList)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to list QRCodes.' })
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    try {
      const QRCode = await QRCodeService.showQRCode(id)

      if (!QRCode) return res.status(404).json({ message: 'QRCode not found' })

      return res.json(QRCode)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to show QRCode.' })
    }
  }

  async showBySlug(req: Request, res: Response) {
    const { slug } = req.params

    try {
      const QRCode = await QRCodeService.showQRCodeBySlug(slug)

      if (!QRCode) return res.status(404).json({ message: 'QRCode not found' })
      
      await QRCodeService.incrementScan(QRCode.id, QRCode)

      return res.json(QRCode)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to show QRCode.' })
    }
  }

  async store(req: Request, res: Response) {
    const { name, customer, url, author_email } = req.body

    if (!name) return res.status(400).json({ message: 'Name is required' })

    if (!customer) return res.status(400).json({ message: 'Customer is required' })

    if (!url) return res.status(400).json({ message: 'Url is required' })

    if (!author_email) return res.status(400).json({ message: 'Author email is required' })

    try {
      const newQRCode = await QRCodeService.createQRCode({ name, customer, url, author_email })

      return res.json(newQRCode)
    } catch (error) {
      //@ts-ignore
      return res.status(500).json({ error: error?.message  || 'Failed to create QRCode.' })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    try {
      const QRCode = await QRCodeService.showQRCode(id)

      if(!QRCode) return res.status(404).json({ message: 'QRCode not found' })

      const newQRCode = await QRCodeService.updateQRCode(id, { ...QRCode, ...req.body })

      return res.json(newQRCode)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update QRCode.' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const QRCode = await QRCodeService.showQRCode(id)
 
      if(!QRCode) return res.status(404).json({ message: 'QRCode not found' })

      await QRCodeService.deleteQRCode(id)

      return res.sendStatus(204)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete QRCode.' })
    }  
  }
}

export default new QRCodeController()

