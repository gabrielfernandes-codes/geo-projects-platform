CREATE TABLE
  IF NOT EXISTS "projects_limit_plateaus" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v7 () NOT NULL,
    "project_id" uuid NOT NULL,
    "geometry" geography (Polygon) NOT NULL,
    "properties" jsonb,
    "created_at" timestamp DEFAULT now (),
    "updated_at" timestamp DEFAULT now ()
  );

DO $$ BEGIN
 ALTER TABLE "projects_limit_plateaus" ADD CONSTRAINT "projects_limit_plateaus_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "projects_limit_plateaus_geometry_idx" ON "projects_limit_plateaus" USING gist ("geometry");
