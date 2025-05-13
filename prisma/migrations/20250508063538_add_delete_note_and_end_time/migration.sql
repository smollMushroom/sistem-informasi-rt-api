/*
  Warnings:

  - You are about to drop the column `notes` on the `LetterRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventSchedule" ALTER COLUMN "endTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LetterRequest" DROP COLUMN "notes";
