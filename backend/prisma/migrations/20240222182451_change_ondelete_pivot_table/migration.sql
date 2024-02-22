-- DropForeignKey
ALTER TABLE "AlbumsOnPictures" DROP CONSTRAINT "AlbumsOnPictures_albumId_fkey";

-- DropForeignKey
ALTER TABLE "AlbumsOnPictures" DROP CONSTRAINT "AlbumsOnPictures_pictureId_fkey";

-- AddForeignKey
ALTER TABLE "AlbumsOnPictures" ADD CONSTRAINT "AlbumsOnPictures_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumsOnPictures" ADD CONSTRAINT "AlbumsOnPictures_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "pictures"("id") ON DELETE CASCADE ON UPDATE CASCADE;
