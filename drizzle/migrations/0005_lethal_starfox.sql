CREATE TABLE `banners` (
	`id` varchar(14) NOT NULL,
	`image` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`subTitle` varchar(255) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`link` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `banners_id` PRIMARY KEY(`id`)
);
