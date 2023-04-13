/*
  Warnings:

  - You are about to drop the `_ApplicationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ApplicationToUser" DROP CONSTRAINT "_ApplicationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToUser" DROP CONSTRAINT "_ApplicationToUser_B_fkey";

-- DropTable
DROP TABLE "_ApplicationToUser";

-- CreateTable
CREATE TABLE "AppUser" (
    "userId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("userId","applicationId")
);

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
