CREATE TABLE `categoria` (
	`id_categoria` int AUTO_INCREMENT NOT NULL,
	`nome_categoria` varchar(50),
	CONSTRAINT `categoria_id_categoria` PRIMARY KEY(`id_categoria`)
);
--> statement-breakpoint
CREATE TABLE `componente` (
	`codigo_componente` int AUTO_INCREMENT NOT NULL,
	`nome_componente` varchar(100),
	`desc_componente` varchar(256),
	`categoria_id` int NOT NULL,
	CONSTRAINT `componente_codigo_componente` PRIMARY KEY(`codigo_componente`)
);
--> statement-breakpoint
CREATE TABLE `equipamento` (
	`id_equipamento` int AUTO_INCREMENT NOT NULL,
	`nome_equipamento` varchar(100),
	CONSTRAINT `equipamento_id_equipamento` PRIMARY KEY(`id_equipamento`)
);
--> statement-breakpoint
CREATE TABLE `equipamento_componente` (
	`id` int AUTO_INCREMENT NOT NULL,
	`equipamento_id` int NOT NULL,
	`componente_id` int NOT NULL,
	CONSTRAINT `equipamento_componente_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `componente` ADD CONSTRAINT `componente_categoria_id_categoria_id_categoria_fk` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id_categoria`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `equipamento_componente` ADD CONSTRAINT `equipamento_componente_equipamento_id_equipamento_fk` FOREIGN KEY (`equipamento_id`) REFERENCES `equipamento`(`id_equipamento`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `equipamento_componente` ADD CONSTRAINT `equipamento_componente_componente_id_componente_fk` FOREIGN KEY (`componente_id`) REFERENCES `componente`(`codigo_componente`) ON DELETE no action ON UPDATE no action;