/*
  Warnings:

  - You are about to alter the column `runtime` on the `moviesTmdb` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "generes" TEXT,
    "movieUrl" TEXT,
    "runtime" INTEGER NOT NULL,
    CONSTRAINT "moviesTmdb_rtveId_fkey" FOREIGN KEY ("rtveId") REFERENCES "moviesRtve" ("movieId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_moviesTmdb" ("generes", "id", "movieUrl", "overview", "popularity", "releaseDate", "rtveId", "runtime", "title", "tmdbId") SELECT "generes", "id", "movieUrl", "overview", "popularity", "releaseDate", "rtveId", "runtime", "title", "tmdbId" FROM "moviesTmdb";
DROP TABLE "moviesTmdb";
ALTER TABLE "new_moviesTmdb" RENAME TO "moviesTmdb";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
