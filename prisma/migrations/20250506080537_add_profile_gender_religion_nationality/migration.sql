/*
  Warnings:

  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religion` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "religion" "Religion" NOT NULL;
