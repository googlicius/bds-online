-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2016 at 11:39 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bsd_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `bds_article`
--

CREATE TABLE `bds_article` (
  `bsd_article_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Tiêu đê bản tin',
  `description` text NOT NULL COMMENT 'Mô tả chi tiết',
  `publish_date` date NOT NULL COMMENT 'Ngày đăng',
  `expire_date` date NOT NULL COMMENT 'Ngày hết hạn',
  `address` varchar(255) NOT NULL,
  `price` int(50) DEFAULT NULL COMMENT 'Mức giá',
  `building_project_id` int(11) DEFAULT NULL COMMENT 'Dự án chung cư',
  `streetid` int(11) DEFAULT NULL COMMENT 'Đường/Phố',
  `furniture` text COMMENT 'Mô tả nội thất',
  `is_broker` int(1) NOT NULL COMMENT 'là trung gian hay chính chủ',
  `contact_name` varchar(100) NOT NULL,
  `contact_adress` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `contact_mobile` varchar(20) NOT NULL,
  `contact_email` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL COMMENT 'Kinh độ, vĩ độ',
  `provinceid` varchar(5) NOT NULL COMMENT 'Tỉnh/Thành phố',
  `wardid` varchar(5) DEFAULT NULL COMMENT 'Phường/Xã',
  `districtid` varchar(5) DEFAULT NULL COMMENT 'Quận/Huyện',
  `created_at` datetime NOT NULL,
  `created_user` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `deleted_user` int(11) NOT NULL,
  `deleted` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bds_attributes`
--

CREATE TABLE `bds_attributes` (
  `attr_id` int(11) NOT NULL,
  `block_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `allow_null` int(1) NOT NULL,
  `seq` int(5) NOT NULL,
  `is_custom` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bds_attributes`
--

INSERT INTO `bds_attributes` (`attr_id`, `block_id`, `name`, `label`, `type`, `allow_null`, `seq`, `is_custom`) VALUES
(1, 1, 'title', 'Tiêu đề', 'text', 0, 1, 0),
(2, 1, 'description', 'Mô tả', 'text', 0, 2, 0),
(3, 1, 'publish_date', 'Ngày đăng', 'date', 0, 3, 0),
(4, 1, 'expire_date', 'Ngày hết hạn', 'date', 0, 4, 0),
(7, 2, 'contact_name', 'Tên liên hệ', 'text', 0, 5, 0),
(8, 2, 'contact_adress', 'Địa chỉ liên hệ', 'text', 1, 6, 1),
(17, 1, 'so_phong', 'Số phòng', 'checkbox', 1, 7, 1),
(18, 1, 'gia', 'Giá', 'radio', 1, 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bds_attribute_options`
--

CREATE TABLE `bds_attribute_options` (
  `id` int(11) NOT NULL,
  `attr_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `seq` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bds_attribute_values`
--

CREATE TABLE `bds_attribute_values` (
  `id` int(11) NOT NULL,
  `attr_id` int(11) NOT NULL,
  `bsd_article_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bds_block`
--

CREATE TABLE `bds_block` (
  `block_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `seq` int(5) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bds_block`
--

INSERT INTO `bds_block` (`block_id`, `name`, `seq`, `description`) VALUES
(1, 'Thông tin cơ bản', 1, ''),
(2, 'Thông tin liên hệ', 2, ''),
(11, 'Địa chỉ', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bds_images`
--

CREATE TABLE `bds_images` (
  `image_id` int(11) NOT NULL,
  `bsd_article_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `building_direction`
--

CREATE TABLE `building_direction` (
  `building_direction_id` int(11) NOT NULL,
  `name` int(100) NOT NULL,
  `active` int(1) NOT NULL,
  `seq` int(5) NOT NULL COMMENT 'Thứ tự hiển thị'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `building_project`
--

CREATE TABLE `building_project` (
  `building_project_id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `active` int(1) NOT NULL,
  `description` text,
  `seq` int(5) NOT NULL COMMENT 'Thứ tự hiển thị',
  `districtid` varchar(5) NOT NULL COMMENT 'Quận/Huyện của Dự án'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `districtid` varchar(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(30) NOT NULL,
  `location` varchar(30) NOT NULL,
  `provinceid` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `emails`
--

CREATE TABLE `emails` (
  `email_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT 'Tiêu đề',
  `content` mediumtext NOT NULL COMMENT 'Nội dung email'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `email_subscription`
--

CREATE TABLE `email_subscription` (
  `email_subscription_id` int(11) NOT NULL,
  `filter` text NOT NULL COMMENT 'Chuỗi JSON lưu các thông tin tìm kiếm',
  `active` int(1) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `file_id` int(11) NOT NULL,
  `file_type` varchar(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `file_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `org_id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `incorporation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `province`
--

CREATE TABLE `province` (
  `provinceid` varchar(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `street`
--

CREATE TABLE `street` (
  `streetid` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `districtid` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `unit_price`
--

CREATE TABLE `unit_price` (
  `unit_price_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `active` int(1) NOT NULL,
  `seq` int(5) NOT NULL COMMENT 'Thứ tự hiển thị'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `website` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  `birthday` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `admin` smallint(6) DEFAULT '0',
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `auth_key`, `password_hash`, `password_reset_token`, `firstname`, `lastname`, `email`, `address`, `phone`, `website`, `org_id`, `birthday`, `admin`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'rH05PFf7T97ceq5dhB-SCUeEQSaNy6oF', '$2y$13$7Zw4zRgNUfz4xDIgJ955duV/ZTbyNJuUR38l906eXQWCWRrftORlS', NULL, 'Nguyen', 'Hai Dang', 'haidang009@gmail.com', 'Tp HCM', NULL, NULL, NULL, NULL, 1, 10, 1479459569, 1479459569);

-- --------------------------------------------------------

--
-- Table structure for table `ward`
--

CREATE TABLE `ward` (
  `wardid` varchar(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(30) NOT NULL COMMENT 'Phường/Xã',
  `location` varchar(30) NOT NULL COMMENT 'Kinh độ, vĩ độ',
  `districtid` varchar(5) NOT NULL COMMENT 'Quận/Huyện'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bds_article`
--
ALTER TABLE `bds_article`
  ADD PRIMARY KEY (`bsd_article_id`),
  ADD KEY `building_project_id` (`building_project_id`),
  ADD KEY `provinceid` (`provinceid`),
  ADD KEY `wardid` (`wardid`),
  ADD KEY `districtid` (`districtid`),
  ADD KEY `streetid` (`streetid`);

--
-- Indexes for table `bds_attributes`
--
ALTER TABLE `bds_attributes`
  ADD PRIMARY KEY (`attr_id`),
  ADD KEY `block_id` (`block_id`);

--
-- Indexes for table `bds_attribute_options`
--
ALTER TABLE `bds_attribute_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attr_id` (`attr_id`);

--
-- Indexes for table `bds_attribute_values`
--
ALTER TABLE `bds_attribute_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bsd_article_id` (`bsd_article_id`),
  ADD KEY `attr_id` (`attr_id`);

--
-- Indexes for table `bds_block`
--
ALTER TABLE `bds_block`
  ADD PRIMARY KEY (`block_id`);

--
-- Indexes for table `bds_images`
--
ALTER TABLE `bds_images`
  ADD KEY `bsd_article_id` (`bsd_article_id`);

--
-- Indexes for table `building_direction`
--
ALTER TABLE `building_direction`
  ADD PRIMARY KEY (`building_direction_id`);

--
-- Indexes for table `building_project`
--
ALTER TABLE `building_project`
  ADD PRIMARY KEY (`building_project_id`),
  ADD KEY `districtid` (`districtid`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`districtid`),
  ADD KEY `provinceid` (`provinceid`);

--
-- Indexes for table `email_subscription`
--
ALTER TABLE `email_subscription`
  ADD PRIMARY KEY (`email_subscription_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`org_id`);

--
-- Indexes for table `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`provinceid`);

--
-- Indexes for table `street`
--
ALTER TABLE `street`
  ADD PRIMARY KEY (`streetid`),
  ADD KEY `districtid` (`districtid`);

--
-- Indexes for table `unit_price`
--
ALTER TABLE `unit_price`
  ADD PRIMARY KEY (`unit_price_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password_reset_token` (`password_reset_token`),
  ADD KEY `org_id` (`org_id`);

--
-- Indexes for table `ward`
--
ALTER TABLE `ward`
  ADD PRIMARY KEY (`wardid`),
  ADD KEY `districtid` (`districtid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bds_article`
--
ALTER TABLE `bds_article`
  MODIFY `bsd_article_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `bds_attributes`
--
ALTER TABLE `bds_attributes`
  MODIFY `attr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `bds_attribute_options`
--
ALTER TABLE `bds_attribute_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `bds_attribute_values`
--
ALTER TABLE `bds_attribute_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `bds_block`
--
ALTER TABLE `bds_block`
  MODIFY `block_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `building_direction`
--
ALTER TABLE `building_direction`
  MODIFY `building_direction_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `building_project`
--
ALTER TABLE `building_project`
  MODIFY `building_project_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `org_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `street`
--
ALTER TABLE `street`
  MODIFY `streetid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `unit_price`
--
ALTER TABLE `unit_price`
  MODIFY `unit_price_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bds_article`
--
ALTER TABLE `bds_article`
  ADD CONSTRAINT `bds_article_building_project_fk` FOREIGN KEY (`building_project_id`) REFERENCES `building_project` (`building_project_id`),
  ADD CONSTRAINT `bds_article_district_fk` FOREIGN KEY (`districtid`) REFERENCES `district` (`districtid`),
  ADD CONSTRAINT `bds_article_province_fk` FOREIGN KEY (`provinceid`) REFERENCES `province` (`provinceid`),
  ADD CONSTRAINT `bds_article_street_fk` FOREIGN KEY (`streetid`) REFERENCES `street` (`streetid`),
  ADD CONSTRAINT `bds_article_ward_fk` FOREIGN KEY (`wardid`) REFERENCES `ward` (`wardid`);

--
-- Constraints for table `bds_attributes`
--
ALTER TABLE `bds_attributes`
  ADD CONSTRAINT `bds_attr_block_fk` FOREIGN KEY (`block_id`) REFERENCES `bds_block` (`block_id`);

--
-- Constraints for table `bds_attribute_options`
--
ALTER TABLE `bds_attribute_options`
  ADD CONSTRAINT `bsd_options_attributes_fk` FOREIGN KEY (`attr_id`) REFERENCES `bds_attributes` (`attr_id`);

--
-- Constraints for table `bds_attribute_values`
--
ALTER TABLE `bds_attribute_values`
  ADD CONSTRAINT `bsd_attr_value_article_fk` FOREIGN KEY (`bsd_article_id`) REFERENCES `bds_article` (`bsd_article_id`),
  ADD CONSTRAINT `bsd_attr_value_attrs_fk` FOREIGN KEY (`attr_id`) REFERENCES `bds_attributes` (`attr_id`);

--
-- Constraints for table `bds_images`
--
ALTER TABLE `bds_images`
  ADD CONSTRAINT `bsd_article_images_fk` FOREIGN KEY (`bsd_article_id`) REFERENCES `bds_article` (`bsd_article_id`);

--
-- Constraints for table `building_project`
--
ALTER TABLE `building_project`
  ADD CONSTRAINT `bu` FOREIGN KEY (`districtid`) REFERENCES `district` (`districtid`);

--
-- Constraints for table `district`
--
ALTER TABLE `district`
  ADD CONSTRAINT `district_province_fk` FOREIGN KEY (`provinceid`) REFERENCES `province` (`provinceid`);

--
-- Constraints for table `street`
--
ALTER TABLE `street`
  ADD CONSTRAINT `street_district_fk` FOREIGN KEY (`districtid`) REFERENCES `district` (`districtid`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_org_fk` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`org_id`);

--
-- Constraints for table `ward`
--
ALTER TABLE `ward`
  ADD CONSTRAINT `ward_district_fk` FOREIGN KEY (`districtid`) REFERENCES `district` (`districtid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
