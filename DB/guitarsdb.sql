-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema guitarsdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `guitarsdb` ;

-- -----------------------------------------------------
-- Schema guitarsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `guitarsdb` DEFAULT CHARACTER SET utf8 ;
USE `guitarsdb` ;

-- -----------------------------------------------------
-- Table `tuning`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tuning` ;

CREATE TABLE IF NOT EXISTS `tuning` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `guitar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `guitar` ;

CREATE TABLE IF NOT EXISTS `guitar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `make` VARCHAR(45) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `year` INT NULL,
  `color` VARCHAR(45) NULL,
  `scale_length` DECIMAL(4,2) NULL,
  `number_of_frets` INT NULL,
  `has_case` TINYINT(1) NULL,
  `image_url` VARCHAR(2000) NULL,
  `bridge` VARCHAR(45) NULL,
  `tuning_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_guitar_tuning1_idx` (`tuning_id` ASC),
  CONSTRAINT `fk_guitar_tuning1`
    FOREIGN KEY (`tuning_id`)
    REFERENCES `tuning` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `setup`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `setup` ;

CREATE TABLE IF NOT EXISTS `setup` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `string_gauge` VARCHAR(45) NOT NULL,
  `string_brand` VARCHAR(45) NULL,
  `date_of_setup` DATE NOT NULL,
  `action_treble` INT NULL,
  `action_bass` INT NULL,
  `notes` VARCHAR(2000) NULL,
  `guitar_id` INT NOT NULL,
  `tuning_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_setup_guitar_idx` (`guitar_id` ASC),
  INDEX `fk_setup_tuning1_idx` (`tuning_id` ASC),
  CONSTRAINT `fk_setup_guitar`
    FOREIGN KEY (`guitar_id`)
    REFERENCES `guitar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_setup_tuning1`
    FOREIGN KEY (`tuning_id`)
    REFERENCES `tuning` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS guitar@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'guitar'@'localhost' IDENTIFIED BY 'guitar';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'guitar'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `tuning`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitarsdb`;
INSERT INTO `tuning` (`id`, `name`) VALUES (1, 'E Standard');
INSERT INTO `tuning` (`id`, `name`) VALUES (2, 'Eb Standard');
INSERT INTO `tuning` (`id`, `name`) VALUES (3, 'D Standard');
INSERT INTO `tuning` (`id`, `name`) VALUES (4, 'C# Standard');

COMMIT;


-- -----------------------------------------------------
-- Data for table `guitar`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitarsdb`;
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (1, 'Gibson', 'Les Paul Custom', 2017, 'Black', 24.75, 22, 1, 'lpc.jpg', 'Tune-O-Matic', 2);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (2, 'Gibson', '80s Explorer', 2022, 'Black', 24.75, 22, 1, 'explorer.png', 'Tune-O-Matic', 3);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (3, 'Fender', 'American Professional Telecaster', 2018, '2-Color Sunburst', 25.5, 22, 1, 'tele.webp', '3-Saddle', 1);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (4, 'Jackson', 'RR1', 2004, 'Black', 25.5, 22, 1, 'rr1.webp', 'Floyd Rose', 2);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (5, 'ESP', 'E-II M-II', 2020, 'Black', 25.5, 24, 1, 'esp.webp', 'Floyd Rose', 3);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (6, 'LTD', 'Mirage Deluxe \'87', 2022, 'Pearl Pink', 25.5, 22, 1, 'ltd.jpg', 'Floyd Rose', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `setup`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitarsdb`;
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (1, '10-46', 'D\'Addario NYXL', '2023-05-05', 3, 4, 'A little light, maybe try 10-48/52 next time', 1, 2);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (2, '11-50', 'D\'Addario XL', '2023-06-02', 3, 4, 'A little light, maybe try 11-52 next time', 2, 3);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (3, '10-46', 'Gibson', '2023-05-12', 3, 4, 'Factory setup, good string tension and action', 2, 1);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (4, '09-42', 'D\'Addario NYXL', '2023-04-22', 3, 4, 'Feels great', 6, 1);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (5, '09-42', 'D\'Addario XL', '2023-04-23', 3, 4, 'Feels good', 3, 1);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (6, '10-52', 'D\'Addario XL', '2023-07-05', 3, 4, 'Feels great, maybe lower the action a bit', 4, 2);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (7, '10-46', 'D\'Addario XT', '2022-01-03', 3, 4, 'Feels good', 5, 3);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (8, '09-46', 'D\'Addario XT', '2022-06-21', 3, 4, NULL, 5, 2);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (9, '11-49', 'D\'Addario XT', '2021-12-15', 3, 4, 'Little loose and floppy, could try those with D Standard', 1, 4);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (10, '09-46', 'D\'Addario XT', '2023-06-21', 3, 4, NULL, 1, 1);

COMMIT;

