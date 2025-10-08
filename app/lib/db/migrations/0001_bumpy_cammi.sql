DROP INDEX `location_id_name_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `location_userId_name_unique` ON `location` (`user_id`,`name`);