CREATE TABLE IF NOT EXISTS "guestbook" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"sign" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pageview" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"path" text,
	"count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"email" varchar(128),
	"avatar" varchar(255),
	"github_user_id" bigint,
	CONSTRAINT "user_github_user_id_unique" UNIQUE("github_user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_key" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "path_idx" ON "pageview" ("path");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guestbook" ADD CONSTRAINT "guestbook_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_key" ADD CONSTRAINT "user_key_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
