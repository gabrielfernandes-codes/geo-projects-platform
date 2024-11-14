ALTER TABLE "projects_limits"
ADD COLUMN "properties" jsonb;

ALTER TABLE "projects_plateaus"
ADD COLUMN "properties" jsonb;

DROP INDEX IF EXISTS "projects_limits_polygon_idx";

DROP INDEX IF EXISTS "projects_plateaus_polygon_idx";

ALTER TABLE "projects_limits"
RENAME COLUMN "polygon" TO "geometry";

ALTER TABLE "projects_plateaus"
RENAME COLUMN "polygon" TO "geometry";

CREATE INDEX IF NOT EXISTS "projects_limits_geometry_idx" ON "projects_limits" USING gist ("geometry");

CREATE INDEX IF NOT EXISTS "projects_plateaus_geometry_idx" ON "projects_plateaus" USING gist ("geometry");