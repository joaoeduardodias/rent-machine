-- DropForeignKey
ALTER TABLE "machines" DROP CONSTRAINT "machines_rent_id_fkey";

-- CreateTable
CREATE TABLE "rent_machines" (
    "id" TEXT NOT NULL,
    "rent_id" TEXT NOT NULL,
    "machine_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "rent_machines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rent_machines_rent_id_machine_id_key" ON "rent_machines"("rent_id", "machine_id");

-- AddForeignKey
ALTER TABLE "rent_machines" ADD CONSTRAINT "rent_machines_rent_id_fkey" FOREIGN KEY ("rent_id") REFERENCES "rents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent_machines" ADD CONSTRAINT "rent_machines_machine_id_fkey" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
