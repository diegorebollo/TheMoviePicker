/*
  Warnings:

  - A unique constraint covering the columns `[movieId]` on the table `moviesRtve` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "moviesTmdb" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rtveId" INTEGER NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" REAL NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    CONSTRAINT "moviesTmdb_rtveId_fkey" FOREIGN KEY ("rtveId") REFERENCES "moviesRtve" ("movieId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "moviesRtve_movieId_key" ON "moviesRtve"("movieId");
