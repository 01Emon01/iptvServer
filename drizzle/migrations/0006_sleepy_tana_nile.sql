ALTER TABLE `banners` RENAME COLUMN `image` TO `images`;--> statement-breakpoint
ALTER TABLE `banners` MODIFY COLUMN `images` json NOT NULL DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `banners` DROP COLUMN `title`;--> statement-breakpoint
ALTER TABLE `banners` DROP COLUMN `subTitle`;--> statement-breakpoint
ALTER TABLE `banners` DROP COLUMN `price`;--> statement-breakpoint
ALTER TABLE `banners` DROP COLUMN `link`;