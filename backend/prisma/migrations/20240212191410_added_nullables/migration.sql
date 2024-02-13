-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_userID_fkey";

-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_userID_fkey";

-- AlterTable
ALTER TABLE "albums" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "userID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pictures" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "userID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
