/*
  Warnings:

  - Added the required column `optionName` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "optionName" TEXT NOT NULL,
    "options" TEXT NOT NULL
);
INSERT INTO "new_questions" ("id", "options", "title") SELECT "id", "options", "title" FROM "questions";
DROP TABLE "questions";
ALTER TABLE "new_questions" RENAME TO "questions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
