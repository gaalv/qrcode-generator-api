import QRCode from "qrcode"
import sh from 'shorthash'
import QRCodeRepository from "../repositories/QRCodeRepository"

interface CreateOrUpdateQRCodeData {
  name: string
  customer: string
  url: string
  author_email: string
}

interface QRCodeData {
  id: string;
  name: string;
  url: string;
  slug: string;
  customer: string;
  qr_code_url: string;
  scans: number;
  short_url: string
  author_email: string
}

class QRCodeService {

  async listQRCodes() {
    return QRCodeRepository.findAll()
  }

  async showQRCode(id: string) {
    return QRCodeRepository.findById(id)
  }

  async showQRCodeBySlug(slug: string) {
    return QRCodeRepository.findBySlug(slug)
  }

  async createQRCode(data: CreateOrUpdateQRCodeData) {
    const { name, customer, url, author_email } = data

    const slug = sh.unique(url)

    const slugAlreadyExists = await QRCodeRepository.findBySlug(slug)

    if(slugAlreadyExists) {
      throw new Error('Already exists a QRCode with this URL')
    }

    const short_url = `${process.env.REDIRECTOR_URL || 'http://localhost:3001'}/${slug}`

    const qr_code_url = await QRCode.toDataURL(short_url, { type: "image/jpeg", rendererOpts: { quality: 1 } })

    return QRCodeRepository.create({ name, customer, url, qr_code_url, slug, short_url, author_email })
  }

  async updateQRCode(id: string, data: CreateOrUpdateQRCodeData) {
    const { name, customer, url, author_email } = data

    const slug = sh.unique(url)

    const short_url = `${process.env.REDIRECTOR_URL || 'http://localhost:3001'}/${slug}`

    const qr_code_url = await QRCode.toDataURL(short_url, { type: "image/jpeg", rendererOpts: { quality: 1 } })

    return QRCodeRepository.updateById(id, { name, customer, url, qr_code_url, slug, short_url, author_email })
  }

  async deleteQRCode(id: string) {
    return QRCodeRepository.deleteById(id)
  }

  async incrementScan(id: string, data: QRCodeData) {
    const { name, customer, url, qr_code_url, slug, short_url, scans, author_email } = data

    return QRCodeRepository.updateById(id, { name, customer, url, qr_code_url, slug, short_url, author_email,  scans: scans + 1 })
  }
}

export default new QRCodeService()