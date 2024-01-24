/*
  Warnings:

  - A unique constraint covering the columns `[movieId]` on the table `moviesRtve` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "moviesRtve_movieId_key" ON "moviesRtve"("movieId");
