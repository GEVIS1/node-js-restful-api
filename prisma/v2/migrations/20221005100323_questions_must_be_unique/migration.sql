/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "endDate" SET DEFAULT NOW() + interval '5 days';

-- CreateIndex
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");
