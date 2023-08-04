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
-- Table `guitar`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `guitar` ;

CREATE TABLE IF NOT EXISTS `guitar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `make` VARCHAR(45) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
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
-- Data for table `guitar`
-- -----------------------------------------------------
START TRANSACTION;
USE `guitarsdb`;
INSERT INTO `guitar` (`id`, `make`, `model`) VALUES (1, 'Gibson', 'Les Paul');

COMMIT;

