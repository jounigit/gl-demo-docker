/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Made the column `userID` on table `albums` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userID` on table `pictures` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_userID_fkey";

-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_userID_fkey";

-- AlterTable
ALTER TABLE "albums" ALTER COLUMN "userID" SET NOT NULL;

-- AlterTable
ALTER TABLE "pictures" ALTER COLUMN "userID" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "username" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
