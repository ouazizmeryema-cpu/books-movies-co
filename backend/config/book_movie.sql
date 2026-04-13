-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 13 avr. 2026 à 06:56
-- Version du serveur : 8.4.7
-- Version de PHP : 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `book_movie`
--

-- --------------------------------------------------------

--
-- Structure de la table `films`
--

DROP TABLE IF EXISTS `films`;
CREATE TABLE IF NOT EXISTS `films` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `acteurs` text NOT NULL,
  `realisateur` varchar(255) NOT NULL,
  `categorie` varchar(100) NOT NULL,
  `note_moyenne` decimal(3,2) DEFAULT '0.00',
  `commentaire` text,
  `nb_votes` int DEFAULT '0',
  `annee_sortie` year NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `notes_film`
--

DROP TABLE IF EXISTS `notes_film`;
CREATE TABLE IF NOT EXISTS `notes_film` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateurs_id` int NOT NULL,
  `films_id` int NOT NULL,
  `scenario` int NOT NULL,
  `jeu_acteur` int NOT NULL,
  `qualite_audiovisuelle` int NOT NULL,
  `note_finale` int NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_note_utilisateur_film` (`utilisateurs_id`,`films_id`),
  KEY `fk_notes_film_films` (`films_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déclencheurs `notes_film`
--
DROP TRIGGER IF EXISTS `trg_notes_film_after_insert`;
DELIMITER $$
CREATE TRIGGER `trg_notes_film_after_insert` AFTER INSERT ON `notes_film` FOR EACH ROW BEGIN
  -- Mise à jour note_moyenne et nb_votes dans films
  UPDATE `films`
  SET
    `nb_votes`     = `nb_votes` + 1,
    `note_moyenne` = (
      SELECT ROUND(AVG(`note_finale`), 2)
      FROM `notes_film`
      WHERE `films_id` = NEW.films_id
    )
  WHERE `id` = NEW.films_id;
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `trg_notes_film_before_insert`;
DELIMITER $$
CREATE TRIGGER `trg_notes_film_before_insert` BEFORE INSERT ON `notes_film` FOR EACH ROW BEGIN
  -- Calcul note_finale arrondie
  SET NEW.note_finale = ROUND((NEW.scenario + NEW.jeu_acteur + NEW.qualite_audiovisuelle) / 3);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `adress` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_utilisateurs_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `notes_film`
--
ALTER TABLE `notes_film`
  ADD CONSTRAINT `fk_notes_film_films` FOREIGN KEY (`films_id`) REFERENCES `films` (`id`),
  ADD CONSTRAINT `fk_notes_film_utilisateurs` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
