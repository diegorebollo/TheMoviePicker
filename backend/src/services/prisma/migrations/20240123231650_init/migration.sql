/*
  Warnings:

  - You are about to drop the `moviesTmdb` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "moviesRtve_movieId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "moviesTmdb";
PRAGMA foreign_keys=on;
