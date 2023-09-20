/*
  Warnings:

  - A unique constraint covering the columns `[author_email]` on the table `qr_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "qr_codes" ADD COLUMN     "author_email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "author_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "qr_codes_author_email_key" ON "qr_codes"("author_email");
