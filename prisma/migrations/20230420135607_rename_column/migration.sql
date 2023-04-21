/*
  Warnings:

  - You are about to drop the column `order` on the `Link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "order",
ADD COLUMN     "position" INTEGER DEFAULT -1;
