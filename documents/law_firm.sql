-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 15, 2026 at 12:14 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `law_firm`
--

-- --------------------------------------------------------

--
-- Table structure for table `advocates`
--

CREATE TABLE `advocates` (
  `id` int NOT NULL,
  `nama` varchar(150) NOT NULL,
  `posisi` varchar(100) NOT NULL,
  `email_1` varchar(150) NOT NULL,
  `email_office` varchar(150) DEFAULT NULL,
  `no_hp` varchar(20) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `bio` text,
  `practice_focus` json DEFAULT NULL,
  `education` json DEFAULT NULL,
  `experience` json DEFAULT NULL,
  `admission` json DEFAULT NULL,
  `membership` json DEFAULT NULL,
  `languages` json DEFAULT NULL,
  `selected_experience` json DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `advocates`
--

INSERT INTO `advocates` (`id`, `nama`, `posisi`, `email_1`, `email_office`, `no_hp`, `foto`, `tagline`, `bio`, `practice_focus`, `education`, `experience`, `admission`, `membership`, `languages`, `selected_experience`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Doby Agustinus Situmorang', 'Founder & Managing Partner', 'dobby@dsplawyer.com', 'info@dsplawyer.com', '081391578817', '/upload/advocate/1789457403713-424145351.jpg', 'Solution-focused, growth-oriented.', 'Doby Agustinus Situmorang is the Founder and Managing Partner of DSP Law Office, advising clients on business, corporate and dispute matters.\r\nHis practice focuses on providing practical, strategic and commercially aware legal counsel, with particular attention to understanding the circumstances and objectives behind each matter.\r\nHe works closely with clients to navigate complex legal issues and develop solutions that are clear, practical and aligned with their objectives.', '[{\"title\": \"Business & Corporate\", \"description\": \"-\"}, {\"title\": \"Contract & Commercial\", \"description\": \"-\"}, {\"title\": \"Dispute Resolution\", \"description\": \"-\"}, {\"title\": \"Empolyment & Industrial Relations\", \"description\": \"-\"}, {\"title\": \"Legal Opinion & Due Diligance\", \"description\": \"-\"}, {\"title\": \"Mergers & Acquisitions\", \"description\": \"-\"}, {\"title\": \"Banking & Finance\", \"description\": \"-\"}, {\"title\": \"Regulatory & Compliance\", \"description\": \"\"}]', '[{\"year\": \"2019\", \"degree\": \"Bachelor of Law\", \"institution\": \"University of Atma Jaya Yogyakarta\"}]', '[{\"period\": \"August 2022 - Present\", \"company\": \"Situmorang & Louis Law Firm\", \"position\": \"Managing Partner\", \"description\": \"-\"}, {\"period\": \"Jan 2020 - Mar 2021\", \"company\": \"IRP Layers\", \"position\": \"Associate\", \"description\": \"-\"}]', '[\"PERADI\"]', '[\"Advokat Indonesia\"]', '[\"Bahasa Indonesia\", \"Bahasa Inggris\"]', '[{\"title\": \"Penataan Struktur Perusahaan dan Transaksi Komersial\", \"description\": \"Pendampingan klien dalam penataan struktur perusahaan serta berbagai transaksi komersial.\"}]', 'active', '2026-09-13 20:28:20', '2026-09-15 07:30:03');

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int NOT NULL,
  `judul` varchar(255) NOT NULL,
  `kategori` varchar(100) NOT NULL DEFAULT 'Legal Update',
  `excerpt` text,
  `isi` longtext NOT NULL,
  `penulis` varchar(150) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `status` enum('Draft','Published') NOT NULL DEFAULT 'Draft',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `judul`, `kategori`, `excerpt`, `isi`, `penulis`, `tanggal`, `gambar`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Indonesia Introduces Mandatory Annual Report and CSR Compliance for Companies', 'Business & Corporate', 'A new Minister of Law regulation overhauls annual reporting obligations for PT and PT PMA companies, with a compliance deadline of 30 June 2026.', 'Indonesia has tightened corporate compliance requirements through Minister of Law Regulation No. 49 of 2025, which took effect on 17 December 2025 and replaces the previous 2021 regulation. The rule introduces fundamental changes to how Limited Liability Companies (PT) and Foreign Investment Limited Liability Companies (PT PMA) must prepare and submit their annual reports.\n\nCompanies are now required to file their annual reports through the Legal Entity Administration System (AHU Online), with a firm submission deadline of 30 June 2026. Failure to comply can result in a company being unable to process further corporate actions until the outstanding report is submitted, effectively freezing its legal standing.\n\nBusinesses operating in Indonesia are advised to begin preparing accurate and complete annual reports well ahead of the deadline to avoid administrative disruption to their operations.', 'DSP Lawyer Editorial Team', '2026-06-10 00:00:00', NULL, 'Published', '2026-09-14 13:47:54', '2026-09-14 13:47:54'),
(2, 'New Rules Tighten Requirements for Annual General Meetings of Shareholders', 'Business & Corporate', 'Annual General Meetings of Shareholders (AGMS) are no longer a mere formality — new regulations impose stricter documentation and filing obligations via AHU Online.', 'A recent regulatory update has reshaped how companies in Indonesia must conduct and document their Annual General Meeting of Shareholders (AGMS). Where the AGMS was previously often treated as an internal procedural matter, it is now subject to stricter formalization, documentation, and submission requirements through the Legal Entity Administration System (AHU Online).\n\nCompanies that fail to meet these requirements risk having their access to AHU Online restricted, which can prevent them from processing other essential corporate actions such as changes to management, capital structure, or company data.\n\nWith the AGMS deadline for many companies falling on 30 June 2026, businesses are encouraged to adopt a structured and proactive preparation timeline to ensure all resolutions and supporting documents are properly filed.', 'DSP Lawyer Editorial Team', '2026-03-15 00:00:00', NULL, 'Published', '2026-09-14 13:49:04', '2026-09-14 13:49:04'),
(3, 'Indonesia Tightens Direct Selling and Trade Compliance Under PP No. 3 of 2026', 'Contract & Commercial', 'New government regulation raises compliance standards for direct selling businesses, emphasizing genuine physical presence and stronger consumer protection.', 'Indonesia has strengthened its regulatory framework for direct selling businesses through Government Regulation (PP) No. 3 of 2026, enacted on 15 January 2026. The regulation amends the earlier PP No. 29 of 2021 on Trade Administration and introduces stricter requirements concerning business address verification, physical office presence, and consumer protection oversight.\n\nFor companies operating under direct selling or distribution structures, physical office requirements and address verification are no longer treated as administrative formalities but as substantive conditions that can determine whether a business license is granted or remains valid.\n\nCompanies already active in this sector, as well as those considering entry into the Indonesian market, should review their existing arrangements against the updated requirements and build early legal and structural preparation into their compliance planning.', 'DSP Lawyer Editorial Team', '2026-01-20 00:00:00', NULL, 'Published', '2026-09-14 13:49:22', '2026-09-14 13:49:22'),
(4, 'Indonesia\'s New Criminal Code Reshapes the Dispute Resolution Landscape', 'Dispute Resolution', 'The new Criminal Code, effective 2 January 2026, changes how ongoing and future criminal proceedings are handled across Indonesia.', 'Indonesia\'s new Criminal Code officially came into effect on 2 January 2026, marking one of the most significant reforms to the country\'s criminal justice framework in decades. Under the transitional rules, any criminal case already under adjudication must now apply the new Criminal Code, unless the previous law is more favorable to the suspect or defendant.\n\nThis shift has direct implications for ongoing litigation, corporate criminal liability, and how legal counsel approaches both litigation and non-litigation dispute resolution strategies.\n\nBusinesses and individuals involved in active or anticipated criminal proceedings are advised to reassess their legal position in light of the new provisions. Legal practitioners are closely monitoring how courts apply the transitional provisions in practice, as early interpretation will likely shape dispute resolution strategy for years to come.', 'DSP Lawyer Editorial Team', '2026-01-25 00:00:00', NULL, 'Published', '2026-09-14 13:49:35', '2026-09-14 13:49:35'),
(5, 'Understanding Indonesia\'s Updated Business Classification (KBLI) System', 'Legal Opinion & Due Diligence', 'The 2025 KBLI update changes how business activities are classified, directly affecting licensing, risk classification, and regulatory obligations.', 'Indonesia\'s Online Single Submission (OSS) licensing system continues to evolve under the risk-based licensing framework introduced through Government Regulation 28/2025 and BKPM Regulation No. 5/2025. A key part of this evolution is the updated Business Classification (KBLI) system introduced through BPS Regulation No. 7/2025, which refines the codes used to classify business activities.\n\nCompanies are required to ensure that their registered KBLI codes accurately reflect their actual operations, particularly where business activities have expanded or changed since incorporation. The OSS system is now more tightly integrated with other government databases, making compliance checks increasingly automated and continuous, and reducing the room for discrepancies between what a company declares and what it actually does.\n\nGiven the six-month adjustment period set for updating KBLI codes, conducting a legal and operational due diligence review is strongly recommended for companies to confirm their classification remains accurate and compliant.', 'DSP Lawyer Editorial Team', '2026-02-20 00:00:00', NULL, 'Published', '2026-09-14 13:49:45', '2026-09-14 13:49:45');

-- --------------------------------------------------------

--
-- Table structure for table `practices`
--

CREATE TABLE `practices` (
  `id` int NOT NULL,
  `nama` varchar(150) NOT NULL,
  `deskripsi` text NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `yang_kami_lakukan` json DEFAULT NULL,
  `pendekatan_kami` json DEFAULT NULL,
  `masalah_umum` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `practices`
--

INSERT INTO `practices` (`id`, `nama`, `deskripsi`, `icon`, `yang_kami_lakukan`, `pendekatan_kami`, `masalah_umum`, `createdAt`, `updatedAt`) VALUES
(3, 'Business & Corporate', 'We provide practical and strategic legal advice to help businesses establish, operate, restructure, and grow with confidence while managing legal and commercial risks.', 'BriefcaseBusiness', '[\"Company establishment and corporate structuring\", \"Corporate governance and compliance\", \"Shareholders and directors\' matters\", \"Corporate restructuring\", \"Business transactions\", \"Shareholders\' agreements\", \"Corporate legal documentation\"]', '[\"Understand the client\'s business structure and objectives\", \"Identify legal and commercial risks\", \"Develop practical and commercially sound solutions\", \"Provide clear advice for informed business decisions\"]', '[\"Company establishment and restructuring\", \"Shareholder disputes and corporate governance\", \"Changes in directors or shareholders\", \"Corporate compliance issues\", \"Business expansion and restructuring\", \"Unclear corporate documentation\"]', '2026-09-14 13:53:45', '2026-09-14 13:53:45'),
(4, 'Contract & Commercial', 'We assist businesses in drafting, reviewing, negotiating, and managing commercial agreements to protect their interests and support sustainable business relationships.', 'FileText', '[\"Commercial agreement drafting\", \"Contract review and legal analysis\", \"Contract negotiation\", \"Partnership agreements\", \"Distribution agreements\", \"Supply and procurement agreements\", \"Service agreements\", \"Transaction documentation\"]', '[\"Understand the commercial objectives behind each transaction\", \"Identify contractual risks and potential liabilities\", \"Ensure rights and obligations are clearly defined\", \"Balance legal protection with commercial practicality\"]', '[\"Unclear contractual obligations\", \"Unfavorable contractual terms\", \"Contract negotiation difficulties\", \"Breach of contract\", \"Disputes regarding payment or performance\", \"Commercial agreements that do not adequately protect the business\"]', '2026-09-14 13:54:06', '2026-09-14 13:54:06'),
(5, 'Dispute Resolution', 'We represent and advise clients in resolving commercial and civil disputes through strategic litigation and alternative dispute resolution, with a focus on achieving effective and sustainable outcomes.', 'Scale', '[\"Civil and commercial litigation\", \"Dispute assessment and legal strategy\", \"Contractual disputes\", \"Shareholder disputes\", \"Debt recovery\", \"Negotiation and settlement\", \"Mediation\", \"Arbitration\", \"Court representation\"]', '[\"Assess the legal and commercial position\", \"Identify the client\'s strongest arguments and available remedies\", \"Develop a dispute resolution strategy\", \"Prioritize efficient and commercially appropriate outcomes\"]', '[\"Contract disputes\", \"Business and commercial disputes\", \"Shareholder conflicts\", \"Unpaid debts and financial claims\", \"Breach of agreements\", \"Disputes requiring negotiation or litigation\"]', '2026-09-14 13:54:17', '2026-09-14 13:54:17'),
(6, 'Employment & Industrial Relations', 'We advise employers and businesses on employment matters, industrial relations, workforce management, and employment disputes while helping clients maintain compliant and effective workplace practices.', 'Users', '[\"Employment agreement drafting and review\", \"Company employment policies\", \"Employee termination and separation\", \"Industrial relations disputes\", \"Employment dispute resolution\", \"Workplace compliance\", \"Company regulations and employee handbooks\", \"Employment legal advice\"]', '[\"Understand the client\'s workforce structure and business needs\", \"Assess employment risks and regulatory requirements\", \"Provide practical solutions for workplace issues\", \"Support preventive measures to minimize employment disputes\"]', '[\"Employee termination disputes\", \"Employment agreement issues\", \"Workplace policy compliance\", \"Industrial relations conflicts\", \"Employee claims\", \"Unclear employment rights and obligations\"]', '2026-09-14 13:54:36', '2026-09-14 13:54:36'),
(7, 'Legal Opinion & Due Diligence', 'We provide legal opinions and due diligence services to help clients understand legal risks, evaluate transactions, and make informed business and investment decisions.', 'ClipboardCheck', '[\"Legal opinion\", \"Legal due diligence\", \"Corporate due diligence\", \"Contract due diligence\", \"Regulatory assessment\", \"Business licensing review\", \"Legal risk identification\", \"Transaction risk assessment\"]', '[\"Review relevant legal and corporate documents\", \"Identify material legal and regulatory risks\", \"Assess potential impact on the client\'s business or transaction\", \"Provide clear findings and practical recommendations\"]', '[\"Unclear legal position\", \"Business licensing concerns\", \"Potential legal risks in transactions\", \"Incomplete corporate documentation\", \"Regulatory compliance concerns\", \"Legal assessment before investment or acquisition\"]', '2026-09-14 13:54:48', '2026-09-14 13:54:48'),
(8, 'Mergers & Acquisitions', 'We assist clients throughout mergers, acquisitions, and other corporate transactions by providing strategic legal advice, transaction support, and risk assessment from preparation through completion.', 'GitMerge', '[\"M&A transaction planning\", \"Legal due diligence\", \"Share acquisition\", \"Asset acquisition\", \"Merger and consolidation\", \"Transaction documentation\", \"Negotiation of transaction terms\", \"Regulatory and corporate approvals\", \"Transaction closing support\"]', '[\"Understand the strategic objectives of the transaction\", \"Identify legal, corporate, and regulatory risks\", \"Coordinate legal due diligence and transaction documentation\", \"Support negotiations toward a commercially viable transaction\"]', '[\"Acquisition structure concerns\", \"Legal risks identified during due diligence\", \"Complex transaction documentation\", \"Regulatory approval requirements\", \"Shareholder considerations\", \"Negotiation difficulties during transactions\"]', '2026-09-14 13:55:07', '2026-09-14 13:55:07'),
(9, 'Banking & Finance', 'We provide legal support for financing transactions and financial arrangements, helping businesses navigate documentation, security structures, regulatory requirements, and associated legal risks.', 'Landmark', '[\"Financing transactions\", \"Loan agreement review and drafting\", \"Security documentation\", \"Corporate guarantees\", \"Debt restructuring\", \"Banking documentation\", \"Financial transaction review\", \"Legal risk assessment\"]', '[\"Understand the financing structure and commercial objectives\", \"Review legal and regulatory requirements\", \"Identify risks relating to financing and security arrangements\", \"Develop documentation that protects the client\'s interests\"]', '[\"Financing documentation issues\", \"Loan agreement concerns\", \"Security and collateral matters\", \"Debt restructuring\", \"Guarantee arrangements\", \"Regulatory issues in financial transactions\"]', '2026-09-14 13:55:18', '2026-09-14 13:55:18'),
(10, 'Regulatory & Compliance', 'We help businesses understand and comply with Indonesian laws and regulations, manage regulatory risks, and develop practical compliance strategies that support their operations.', 'ShieldCheck', '[\"Regulatory compliance assessment\", \"Business licensing review\", \"Corporate compliance\", \"Regulatory risk assessment\", \"Compliance policy review\", \"Government regulatory requirements\", \"Business activity classification review\", \"Compliance advisory\"]', '[\"Understand the client\'s business activities and regulatory environment\", \"Identify applicable legal and regulatory requirements\", \"Assess existing compliance gaps\", \"Develop practical recommendations to address regulatory risks\"]', '[\"Business licensing issues\", \"Regulatory compliance gaps\", \"Changes in regulatory requirements\", \"Incorrect business classification\", \"Corporate compliance concerns\", \"Uncertainty regarding applicable regulations\"]', '2026-09-14 13:55:29', '2026-09-14 13:55:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','editor') NOT NULL DEFAULT 'editor',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'dps', 'dps@gmail.com', '$2b$10$E.RFfbcUjmhuidBeGy8lD.8l8q4SVftjRNNjyNEoFdZsCJi5S2KT6', 'admin', '2026-09-11 23:15:28', '2026-09-11 23:15:28'),
(2, 'Admin Law Firm', 'admin@lawfirm.com', '$2b$10$FyMpgJs6x/bTNlXQW2IMNuGYhGI30IL7.XQ2EjcEgdzt31tHW4EfG', 'admin', '2026-09-12 04:25:00', '2026-09-12 04:25:00'),
(3, 'Wicaksana Adi saputro', 'wicak@lawfirm.com', '$2b$10$HIErl0U5eL2qwU.zkYlf.OiLwu6LyJLKQ/jEdp8npG7Rl06FFOvN2', 'admin', '2026-09-12 08:02:21', '2026-09-12 08:02:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advocates`
--
ALTER TABLE `advocates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `practices`
--
ALTER TABLE `practices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advocates`
--
ALTER TABLE `advocates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `practices`
--
ALTER TABLE `practices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
