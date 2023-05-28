/*
  Warnings:

  - A unique constraint covering the columns `[documentId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.
  - Made the column `typeDocumentId` on table `Document` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_typeDocumentId_fkey";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "typeDocumentId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Submission_documentId_key" ON "Submission"("documentId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_typeDocumentId_fkey" FOREIGN KEY ("typeDocumentId") REFERENCES "TypeDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
