CREATE TABLE `categories` (
	`id` varchar(14) NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(14) NOT NULL,
	`images` json NOT NULL DEFAULT ('[]'),
	`name` varchar(255) NOT NULL,
	`category` varchar(14),
	`shortDesc` json NOT NULL,
	`desc` json NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`discount` decimal(10,2) NOT NULL,
	`stock` int NOT NULL,
	`sales` int NOT NULL,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` varchar(14) NOT NULL,
	`name` varchar(150) NOT NULL,
	`description` text NOT NULL,
	`keywords` text NOT NULL,
	`logo` varchar(255) NOT NULL,
	`favicon` varchar(255) NOT NULL,
	`footer_info` text,
	`support_email` varchar(150),
	`supportNo` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_categories_id_fk` FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE no action;