/*
  Warnings:

  - You are about to drop the column `authorId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `file` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Document` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileBody` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_authorId_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "authorId",
DROP COLUMN "file",
DROP COLUMN "title",
ADD COLUMN     "cardId" INTEGER NOT NULL,
ADD COLUMN     "fileBody" BYTEA NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
