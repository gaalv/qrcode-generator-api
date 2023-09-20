/*
  Warnings:

  - You are about to drop the column `short_url` on the `qr_codes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "qr_codes" DROP COLUMN "short_url",
ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';
