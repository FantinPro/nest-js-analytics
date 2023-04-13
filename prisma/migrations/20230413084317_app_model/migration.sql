-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApplicationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationToUser_AB_unique" ON "_ApplicationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationToUser_B_index" ON "_ApplicationToUser"("B");

-- AddForeignKey
ALTER TABLE "_ApplicationToUser" ADD CONSTRAINT "_ApplicationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToUser" ADD CONSTRAINT "_ApplicationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
