/*
  Warnings:

  - The primary key for the `Score` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Score` table. All the data in the column will be lost.
  - Added the required column `quizId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "endDate" SET DEFAULT NOW() + interval '5 days';

-- AlterTable
ALTER TABLE "Score" DROP CONSTRAINT "Score_pkey",
DROP COLUMN "id",
ADD COLUMN     "quizId" INTEGER NOT NULL,
ADD CONSTRAINT "Score_pkey" PRIMARY KEY ("userId", "quizId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
