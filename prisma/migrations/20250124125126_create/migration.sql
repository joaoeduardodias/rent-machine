-- CreateTable
CREATE TABLE "machines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL DEFAULT '',
    "price_per_day" DOUBLE PRECISION NOT NULL,
    "price_per_km" DOUBLE PRECISION NOT NULL,
    "img_src" TEXT NOT NULL,

    CONSTRAINT "machines_pkey" PRIMARY KEY ("id")
);
