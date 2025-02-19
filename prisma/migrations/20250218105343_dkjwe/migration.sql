/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_receiverId_fkey";

-- DropIndex
DROP INDEX "Chat_senderId_receiverId_idx";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "receiverId";
