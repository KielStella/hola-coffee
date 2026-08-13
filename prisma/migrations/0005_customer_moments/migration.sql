CREATE TABLE "Moment" (
  "id" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "caption" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "isApproved" BOOLEAN NOT NULL DEFAULT false,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Moment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Moment_isApproved_createdAt_idx" ON "Moment"("isApproved", "createdAt");
CREATE INDEX "Moment_userId_idx" ON "Moment"("userId");

ALTER TABLE "Moment"
  ADD CONSTRAINT "Moment_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
