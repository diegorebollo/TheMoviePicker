-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_moviesRtve" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryName" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "movieName" TEXT NOT NULL,
    "imdbId" TEXT,
    "movieId" INTEGER NOT NULL
);
INSERT INTO "new_moviesRtve" ("categoryId", "categoryName", "id", "imdbId", "movieId", "movieName") SELECT "categoryId", "categoryName", "id", "imdbId", "movieId", "movieName" FROM "moviesRtve";
DROP TABLE "moviesRtve";
ALTER TABLE "new_moviesRtve" RENAME TO "moviesRtve";
CREATE UNIQUE INDEX "moviesRtve_movieId_key" ON "moviesRtve"("movieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
