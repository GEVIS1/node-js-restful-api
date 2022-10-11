-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "endDate" SET DEFAULT NOW() + interval '5 days';
