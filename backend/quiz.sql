-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2024 at 05:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'technology'),
(2, 'geography'),
(3, 'math'),
(4, 'automotive'),
(6, 'mixed quiz'),
(7, 'movies'),
(8, 'tv-shows'),
(9, 'comics');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL,
  `questionText` text NOT NULL,
  `firstAnswer` varchar(255) NOT NULL,
  `secondAnswer` varchar(255) NOT NULL,
  `thirdAnswer` varchar(255) NOT NULL,
  `correctAnswer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `idCategory`, `questionText`, `firstAnswer`, `secondAnswer`, `thirdAnswer`, `correctAnswer`) VALUES
(2, 1, 'What company makes the Xperia smartphone?', 'Samsung', 'Apple', 'Xiaomi', 'Sony'),
(3, 1, 'What was the most downloaded app of the 2010s?', 'Whatsapp', 'Instagram', 'Youtube', 'Facebook'),
(4, 1, 'What app has a green owl as the mascot?', 'Telegram', 'Babbel', 'Lirica', 'Duolingo'),
(5, 1, 'What software development hosting company has an Octocat for the logo?', 'Gitlab', 'SourceForge', 'Launchpad', 'Github'),
(6, 1, 'What company made the first portable computer in 1981?', 'IBM', 'Compaq', 'Apple', 'Osborne company'),
(7, 4, 'What is the full form of ABS, a safety technology used in cars and bikes?', 'All lock Braking System', 'Anti-lock Braking Solution', 'Anti Braking System', 'Anti-lock Braking System'),
(8, 4, 'Which company owns these brands: Bentley, Bugatti, Lamborghini and Audi?', 'Mercedes-Benz', 'Audi', 'BMW', 'Volkswagen'),
(9, 4, 'Which of the following is a South Korean carmaker?', 'Mazda', 'Dodge', 'Opel', 'Kia'),
(10, 4, 'Lexus is the luxury divison of Japanese automakers:', 'Nissan', 'Honda', 'Mazda', 'Toyota'),
(11, 4, 'Name the brand/company which has four overlapping rings as its logo/emblem:', 'Opel', 'Toyota', 'BMW', 'Audi'),
(12, 4, 'The first modern three-point seatbelt was developed by which carmaker?', 'SAAB', 'SEAT', 'Skoda', 'Volvo'),
(13, 7, 'What was the first movie in the Marvel Cinematic Universe', 'Batman', 'Spider-Man', 'The Avengers', 'Iron Man'),
(14, 7, 'Which of these actors didn\'t appear in Pulp Fiction', 'Bruce Willis', 'Samuel L. Jackson', 'Uma Thurman', 'John Turturro'),
(15, 7, 'What is it called when an actor breaks character to directly address the audience?', 'Sweeping the rug', 'Bending the narrative', 'Following the loose thread', 'Breaking the fourth wall'),
(16, 7, 'Which of these movies was not directed by M. Night Shyamalan?', 'Glass', 'The Sixth Sense', 'Signs', 'The Ring'),
(17, 7, 'Which of the following is filmmaker Michael Bay known for?', 'Sweeping Western landscapes', 'Fanciful cosutme design', 'Romantic comedy', 'Explosions'),
(19, 2, 'Which of these countries was not a part of the Soviet Union?', 'Belarus', 'Georgia', 'Ukraine', 'Poland'),
(20, 2, 'Which of these cities is not a national capital?', 'Bangkok', 'Cairo', 'Prague', 'Sydney'),
(21, 2, 'Which of these countries was never part of the British Empire?', 'Ireland', 'Kenya', 'New Zealand', 'Thailand'),
(22, 2, 'Which of these countries is not recognized by the United Nations?', 'Cyprus', 'Iran', 'Israel', 'Taiwan'),
(23, 8, 'Which of these TV shows ended in 2015?', 'The Office', 'The Big Bang Theory', 'Modern Family', 'Parks and Recreation'),
(24, 8, 'Which of these sitcoms was set in Minneapolis?', 'Married... with Children', 'Frasier', 'Cheers', 'The Mary Tyler Moore Show'),
(25, 8, 'Which actor from \'Friends\' later starred in a titular spin-off?', 'Jennifer Aniston', 'Courtney Cox', 'David Schwimmer', 'Matt LeBlanc');

-- --------------------------------------------------------

--
-- Table structure for table `userlogs`
--

CREATE TABLE `userlogs` (
  `id` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `lastLogin` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userlogs`
--

INSERT INTO `userlogs` (`id`, `idUser`, `lastLogin`) VALUES
(1, 1, '2024-10-05 17:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `userRole` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fname`, `lname`, `email`, `userRole`, `createdAt`) VALUES
(1, 'mmijok', '$2y$10$ixW2m6NOCe3HnCwh2cujr.MmzcGGcOiBR0oK9ew3fyb0hKJ/M/A/K', 'Matej', 'Mijok', 'matej.mijok@gmail.com', 'admin', '2024-10-05 17:14:02');

-- --------------------------------------------------------

--
-- Table structure for table `userstatistics`
--

CREATE TABLE `userstatistics` (
  `id` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `gamesPlayed` int(11) DEFAULT 0,
  `questionsAnswered` int(11) DEFAULT 0,
  `correctAnswers` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userstatistics`
--

INSERT INTO `userstatistics` (`id`, `idUser`, `gamesPlayed`, `questionsAnswered`, `correctAnswers`) VALUES
(1, 1, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCategory` (`idCategory`);

--
-- Indexes for table `userlogs`
--
ALTER TABLE `userlogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userstatistics`
--
ALTER TABLE `userstatistics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `userlogs`
--
ALTER TABLE `userlogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userstatistics`
--
ALTER TABLE `userstatistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userlogs`
--
ALTER TABLE `userlogs`
  ADD CONSTRAINT `userlogs_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userstatistics`
--
ALTER TABLE `userstatistics`
  ADD CONSTRAINT `userstatistics_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
