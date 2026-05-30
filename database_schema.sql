-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2026 at 08:55 AM
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
-- Database: `github_analyzer`
--

-- --------------------------------------------------------

--
-- Table structure for table `github_profiles`
--

CREATE TABLE `github_profiles` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `followers` int(11) DEFAULT 0,
  `following` int(11) DEFAULT 0,
  `public_repos` int(11) DEFAULT 0,
  `avatar_url` text DEFAULT NULL,
  `github_url` text DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `account_created_at` datetime DEFAULT NULL,
  `profile_score` int(11) DEFAULT 0,
  `analyzed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `github_profiles`
--

INSERT INTO `github_profiles` (`id`, `username`, `name`, `bio`, `followers`, `following`, `public_repos`, `avatar_url`, `github_url`, `company`, `location`, `account_created_at`, `profile_score`, `analyzed_at`) VALUES
(1, 'torvalds', 'Linus Torvalds', NULL, 305052, 0, 11, 'https://avatars.githubusercontent.com/u/1024025?v=4', 'https://github.com/torvalds', 'Linux Foundation', 'Portland, OR', '2011-09-03 15:26:22', 610159, '2026-05-30 04:36:44'),
(2, 'nithin-code-web', 'Nithin Budime', 'hello! ', 0, 0, 13, 'https://avatars.githubusercontent.com/u/226073331?v=4', 'https://github.com/nithin-code-web', NULL, NULL, '2025-08-12 10:11:04', 65, '2026-05-30 04:55:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `github_profiles`
--
ALTER TABLE `github_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `github_profiles`
--
ALTER TABLE `github_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
