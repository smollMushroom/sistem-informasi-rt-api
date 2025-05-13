/*
  Warnings:

  - You are about to drop the `EventSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventSchedule" DROP CONSTRAINT "EventSchedule_createdById_fkey";

-- DropForeignKey
ALTER TABLE "LetterRequest" DROP CONSTRAINT "LetterRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "EventSchedule";

-- AddForeignKey
ALTER TABLE "LetterRequest" ADD CONSTRAINT "LetterRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
