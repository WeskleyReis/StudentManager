-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/11/2026 às 16:23
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `student_manager`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `estudantes`
--

CREATE TABLE `estudantes` (
  `id` int(11) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `nome` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `curso` varchar(120) NOT NULL,
  `periodo` varchar(30) NOT NULL,
  `status` enum('Ativo','Trancado','Inativo') NOT NULL DEFAULT 'Ativo',
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `estudantes`
--

INSERT INTO `estudantes` (`id`, `matricula`, `nome`, `email`, `curso`, `periodo`, `status`, `criado_em`) VALUES
(1, '20251042', 'Lucas Gabriel Almeida', 'lucas.almeida@academico.edu.br', 'Engenharia de Software', '5º Semestre', 'Ativo', '2026-11-22 15:02:48'),
(2, '20251089', 'Beatriz Souza Nogueira', 'beatriz.nogueira@academico.edu.br', 'Ciência da Computação', '3º Semestre', 'Ativo', '2026-11-22 15:02:48'),
(3, '20252015', 'Pedro Henrique Costa', 'pedro.costa@academico.edu.br', 'Sistemas de Informação', '6º Semestre', 'Trancado', '2026-11-22 15:02:48'),
(4, '20251105', 'Camila Ferreira Lima', 'camila.lima@academico.edu.br', 'Análise e Desenvolvimento de Sistemas', '2º Semestre', 'Ativo', '2026-11-22 15:02:48'),
(5, '20252341', 'Rafael Mendes Cardoso', 'rafael.cardoso@academico.edu.br', 'Engenharia de Software', '7º Semestre', 'Inativo', '2026-11-22 15:02:48'),
(6, '20253064', 'Juliana Martins Rocha', 'juliana.rocha@academico.edu.br', 'Design Digital', '4º Semestre', 'Ativo', '2026-11-22 15:02:48');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `estudantes`
--
ALTER TABLE `estudantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula` (`matricula`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `estudantes`
--
ALTER TABLE `estudantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
