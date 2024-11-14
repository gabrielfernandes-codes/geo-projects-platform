CREATE TABLE
  IF NOT EXISTS "projects_limits" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v7 () NOT NULL,
    "project_id" uuid NOT NULL,
    "polygon" geography(Polygon) NOT NULL,
    "created_at" timestamp DEFAULT now (),
    "updated_at" timestamp DEFAULT now ()
  );

CREATE TABLE
  IF NOT EXISTS "projects_plateaus" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v7 () NOT NULL,
    "project_id" uuid NOT NULL,
    "polygon" geography(Polygon) NOT NULL,
    "created_at" timestamp DEFAULT now (),
    "updated_at" timestamp DEFAULT now ()
  );

DROP TABLE "projects_plot" CASCADE;
DO $$ BEGIN
 ALTER TABLE "projects_limits" ADD CONSTRAINT "projects_limits_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects_plateaus" ADD CONSTRAINT "projects_plateaus_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "projects_limits_geometry_idx" ON "projects_limits" USING gist ("polygon");

CREATE INDEX IF NOT EXISTS "projects_plateaus_geometry_idx" ON "projects_plateaus" USING gist ("polygon");
