/*
  Warnings:

  - A unique constraint covering the columns `[id,origin,secret]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `origin` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AppUser" DROP CONSTRAINT "AppUser_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "AppUser" DROP CONSTRAINT "AppUser_userId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "origin" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Application_id_origin_secret_key" ON "Application"("id", "origin", "secret");

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
