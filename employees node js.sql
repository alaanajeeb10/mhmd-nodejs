
-- מבנה טבלה עבור טבלה `employess`
--
CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `First_name` varchar(250) NOT NULL,
  `Last_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `employess`
--

INSERT INTO `employess` (`Firstname`, `lastname`, `employe id`) VALUES
('mhmd', 'alaa', 0);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `shift`
--

CREATE TABLE `shift` (
  `employeesid` int(11) NOT NULL,
  `entrance` time NOT NULL,
  `output` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

