/*
  Warnings:

  - You are about to drop the column `image` on the `pictures` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `pictures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `pictures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pictures" DROP COLUMN "image",
ADD COLUMN     "fileId" VARCHAR(255) NOT NULL,
ADD COLUMN     "thumbnailUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "url" VARCHAR(255) NOT NULL;
