-- DropIndex
DROP INDEX "qr_codes_author_email_key";

-- AlterTable
ALTER TABLE "qr_codes" ALTER COLUMN "author_email" DROP DEFAULT;
