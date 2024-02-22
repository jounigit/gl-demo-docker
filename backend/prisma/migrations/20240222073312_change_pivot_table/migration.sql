/*
  Warnings:

  - You are about to drop the `AlbumPicture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlbumPicture" DROP CONSTRAINT "AlbumPicture_albumId_fkey";

-- DropForeignKey
ALTER TABLE "AlbumPicture" DROP CONSTRAINT "AlbumPicture_pictureId_fkey";

-- DropTable
DROP TABLE "AlbumPicture";

-- CreateTable
CREATE TABLE "AlbumsOnPictures" (
    "albumId" INTEGER NOT NULL,
    "pictureId" INTEGER NOT NULL,

    CONSTRAINT "AlbumsOnPictures_pkey" PRIMARY KEY ("albumId","pictureId")
);

-- AddForeignKey
ALTER TABLE "AlbumsOnPictures" ADD CONSTRAINT "AlbumsOnPictures_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumsOnPictures" ADD CONSTRAINT "AlbumsOnPictures_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
