CREATE TABLE `specials` (
	`id` varchar(14) NOT NULL,
	`fstPrd` varchar(14),
	`secPrd` varchar(14),
	`thirdPrd` varchar(14),
	`frthPrd` varchar(14),
	CONSTRAINT `specials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `specials` ADD CONSTRAINT `specials_fstPrd_products_id_fk` FOREIGN KEY (`fstPrd`) REFERENCES `products`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `specials` ADD CONSTRAINT `specials_secPrd_products_id_fk` FOREIGN KEY (`secPrd`) REFERENCES `products`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `specials` ADD CONSTRAINT `specials_thirdPrd_products_id_fk` FOREIGN KEY (`thirdPrd`) REFERENCES `products`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `specials` ADD CONSTRAINT `specials_frthPrd_products_id_fk` FOREIGN KEY (`frthPrd`) REFERENCES `products`(`id`) ON DELETE set null ON UPDATE no action;