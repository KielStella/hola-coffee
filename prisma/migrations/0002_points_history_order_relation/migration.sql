-- AlterTable: add the foreign key relation from PointsHistory.orderId to Order.id
-- (orderId already existed as a plain column; this just adds the index + FK
-- constraint now that it's a proper Prisma relation)
CREATE INDEX "PointsHistory_orderId_idx" ON "PointsHistory"("orderId");

ALTER TABLE "PointsHistory"
  ADD CONSTRAINT "PointsHistory_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "Order"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
