-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 22-07-2024 a las 06:24:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miniproyecto2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `bio` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `password`, `name`, `phone`, `bio`) VALUES
(1, 'romario3-editado@example.com', '$2b$10$mqd2JV7gy8PPiQioPz8GXOblTdp67G0afciTuYp3fJrrpJm/A6zcC', 'Romario Shiro', '+56 890948493', 'Hola ahora me llamo shiro'),
(2, 'romario2@example.com', '$2b$10$.3eK/PK2wEktuoXZMFuQHe9b8IHuAEEm1NvqGTqsv.MhJqO4z2l5W', 'Romario 2', '+56 890222222', 'soy romario 2'),
(3, 'papas@example.com', '$2b$10$HIvLnKB9DziMmgV1qBOxrOlI7Fx9zsAKQZGNFjTItxpjrXw6r3a/S', 'Francis Simon', '+51 990984902', 'Hola soy el papas!'),
(4, 'papas2@example.com', '$2b$10$KO6KT6tES9E3Kvj6zJHEXevLAwBCsx37oyr.82klwhmzJSMB.gwf.', 'Papitas Locas', '+51 121212121212', 'Vocalista de los Catchers'),
(5, 'will@oncehumanos.com', '$2b$10$nv5qQVytnjhteF.53p0o1.wSA7zWhgOVf7K4HhbXyVurdmsGLn.uS', 'WeedLiam', '+51 12344332323', 'Juego 11 humanos, ya no juego al lol :('),
(6, 'mauri@example', '$2b$10$ODeq8GvUNMRNXFDaFSugpeRgKC24qrPWbLceGvckJHuPLWlbMH1DO', 'Mauri', '12313132332', 'Wismichu Marucio');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
