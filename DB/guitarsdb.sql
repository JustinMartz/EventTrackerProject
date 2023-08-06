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
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (1, 'Gibson', 'Les Paul Custom', 2017, 'Black', 24.75, 22, 1, 'https://media.sweetwater.com/api/i/q-82__ha-84928b3fd694f1b9__hmac-eeb407415f6410b95c9b686d351900334bc1b4a7/images/closeup/750-LPCustEBGH_front.jpg', 'Tune-O-Matic', 2);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (2, 'Gibson', '80s Explorer', 2022, 'Black', 24.75, 22, 1, 'https://images.ctfassets.net/m8onsx4mm13s/4KhwNjBps7fEm8QIV2ow94/169d91e38efdb71e7dacfc9458dd8165/DSXE00EBCH1_front.png', 'Tune-O-Matic', 3);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (3, 'Fender', 'American Professional Telecaster', 2018, '2-Color Sunburst', 25.5, 22, 1, 'https://media.sweetwater.com/api/i/q-82__w-750__f-webp__ha-4780225182c45b13__hmac-f3d3183139025beef5cf9875d733b2a9c807e941/images/closeup/750-TeleAPM2SB_front.jpg', '3-Saddle', 1);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (4, 'Jackson', 'RR1', 2004, 'Black', 25.5, 22, 1, 'https://media.sweetwater.com/api/i/q-82__w-750__f-webp__ha-1269b226ae0a3441__hmac-b8f13434434be9b4ce629db595dd65d9bb76f631/images/closeup/750-RR1BLK_front.jpg', 'Floyd Rose', 2);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (5, 'ESP', 'E-II M-II', 2020, 'Black', 25.5, 24, 1, 'https://cdn.connectsites.net/user_files/esp/product_images/000/020/652/original.png', 'Floyd Rose', 3);
INSERT INTO `guitar` (`id`, `make`, `model`, `year`, `color`, `scale_length`, `number_of_frets`, `has_case`, `image_url`, `bridge`, `tuning_id`) VALUES (6, 'LTD', 'Mirage Deluxe \'87', 2022, 'Pearl Pink', 25.5, 22, 1, 'https://cdn.connectsites.net/user_files/esp/product_images/000/027/877/original.png', 'Floyd Rose', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `setup`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitarsdb`;
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (1, '10-46', 'D\'Addario NYXL', '2023-05-05', 3, 4, 'A little light, maybe try 10-48/52 next time', 1, 2);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (2, '11-50', 'D\'Addario XL', '2023-06-02', 3, 4, 'A little light, maybe try 11-52 next time', 2, 3);
INSERT INTO `setup` (`id`, `string_gauge`, `string_brand`, `date_of_setup`, `action_treble`, `action_bass`, `notes`, `guitar_id`, `tuning_id`) VALUES (3, '10-46', 'Gibson', '2023-05-12', 3, 4, 'Factory setup, good string tension and action', 2, 1);

COMMIT;

