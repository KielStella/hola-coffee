-- CreateEnum
CREATE TYPE "OrderSource" AS ENUM ('QR', 'WALK_IN');

-- AlterTable: existing orders safely default to 'QR' (they were all placed via the QR flow)
ALTER TABLE "Order" ADD COLUMN "source" "OrderSource" NOT NULL DEFAULT 'QR';
ALTER TABLE "Order" ADD COLUMN "createdByStaffId" TEXT;

CREATE INDEX "Order_source_idx" ON "Order"("source");
CREATE INDEX "Order_createdByStaffId_idx" ON "Order"("createdByStaffId");

ALTER TABLE "Order"
  ADD CONSTRAINT "Order_createdByStaffId_fkey"
  FOREIGN KEY ("createdByStaffId") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
