/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Score` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "endDate" SET DEFAULT NOW() + interval '5 days';

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Score" DROP CONSTRAINT "Score_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Score_pkey" PRIMARY KEY ("id");
