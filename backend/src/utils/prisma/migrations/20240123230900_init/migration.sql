/*
  Warnings:

  - You are about to alter the column `tmdbId` on the `moviesTmdb` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    CONSTRAINT "moviesTmdb_rtveId_fkey" FOREIGN KEY ("rtveId") REFERENCES "moviesRtve" ("movieId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_moviesTmdb" ("id", "overview", "popularity", "releaseDate", "rtveId", "title", "tmdbId") SELECT "id", "overview", "popularity", "releaseDate", "rtveId", "title", "tmdbId" FROM "moviesTmdb";
DROP TABLE "moviesTmdb";
ALTER TABLE "new_moviesTmdb" RENAME TO "moviesTmdb";
CREATE TABLE "new_moviesRtve" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryName" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "movieName" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL
);
INSERT INTO "new_moviesRtve" ("categoryId", "categoryName", "id", "imdbId", "movieId", "movieName") SELECT "categoryId", "categoryName", "id", "imdbId", "movieId", "movieName" FROM "moviesRtve";
DROP TABLE "moviesRtve";
ALTER TABLE "new_moviesRtve" RENAME TO "moviesRtve";
CREATE UNIQUE INDEX "moviesRtve_movieId_key" ON "moviesRtve"("movieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
