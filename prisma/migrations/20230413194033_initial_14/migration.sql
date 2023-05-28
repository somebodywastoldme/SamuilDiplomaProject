-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "id" SET DEFAULT serial,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Document_id_seq";

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "id" SET DEFAULT serial,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Submission_id_seq";
