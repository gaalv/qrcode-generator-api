import { prismaClient } from "../database/prismaClient";

interface QRCodeData {
  name: string
  customer: string
  qr_code_url: string
  url: string
  slug: string
  scans?: number
  short_url: string
  author_email: string
}

class QRCodeRepository {

  async findAll() {
    return prismaClient.qr_codes.findMany({ orderBy: { created_at: 'asc' } })
  }

  async findById(id: string) {
    return prismaClient.qr_codes.findUnique({ where: { id } })
  }

  async findBySlug(slug: string) {
    return prismaClient.qr_codes.findFirst({ where: { slug } })
  }

  async create(data: QRCodeData) {
    return prismaClient.qr_codes.create({ data })
  }

  async updateById(id: string, data: QRCodeData) {
    return prismaClient.qr_codes.update({ where: { id }, data })
  }

  async deleteById(id: string) {
    return prismaClient.qr_codes.delete({ where: { id } })
  }
}

export default new QRCodeRepository()