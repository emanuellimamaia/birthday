/*
  Warnings:

  - You are about to drop the `convidados` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."convidados";

-- CreateTable
CREATE TABLE "public"."guests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);
