/*
  Warnings:

  - A unique constraint covering the columns `[author_email]` on the table `qr_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "qr_codes_author_email_key" ON "qr_codes"("author_email");
