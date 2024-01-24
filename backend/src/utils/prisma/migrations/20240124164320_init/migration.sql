/*
  Warnings:

  - Added the required column `generes` to the `moviesTmdb` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_moviesTmdb" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rtveId" INTEGER NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" REAL NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "generes" TEXT NOT NULL,
    CONSTRAINT "moviesTmdb_rtveId_fkey" FOREIGN KEY ("rtveId") REFERENCES "moviesRtve" ("movieId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_moviesTmdb" ("id", "overview", "popularity", "releaseDate", "rtveId", "title", "tmdbId") SELECT "id", "overview", "popularity", "releaseDate", "rtveId", "title", "tmdbId" FROM "moviesTmdb";
DROP TABLE "moviesTmdb";
ALTER TABLE "new_moviesTmdb" RENAME TO "moviesTmdb";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
