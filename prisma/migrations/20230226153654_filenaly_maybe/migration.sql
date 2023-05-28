/*
  Warnings:

  - You are about to drop the `_room_floor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `floorId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_room_floor" DROP CONSTRAINT "_room_floor_A_fkey";

-- DropForeignKey
ALTER TABLE "_room_floor" DROP CONSTRAINT "_room_floor_B_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "floorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_room_floor";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
