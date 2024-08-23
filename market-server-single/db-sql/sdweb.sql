/*
 Navicat Premium Data Transfer

 Source Server         : hece-eobeans
 Source Server Type    : MySQL
 Source Server Version : 80024
 Source Host           : localhost:3306
 Source Schema         : sdweb

 Target Server Type    : MySQL
 Target Server Version : 80024
 File Encoding         : 65001

 Date: 29/03/2024 16:05:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NULL DEFAULT 1,
  `title` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` bigint NOT NULL,
  `state` int NOT NULL DEFAULT 1,
  `seeNum` int NULL DEFAULT 0,
  `likesNum` int NULL DEFAULT 0,
  `commentNum` int NULL DEFAULT 0,
  `imgList` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO `blogs` VALUES (1, 2, '数据可视化大屏电子沙盘集合', 'https://cdn.zhoukaiwen.com/FuKhYkmUYaAgxxWyl4KnrZMurjeh', '数据可视化大屏电子沙盘集合，基于：html/dataV/Echarts等等，包含行业：区块链金融行业、智慧社区、智慧物业、智慧政务、智慧交通、通用模板等，包含功能：自定义字体、Css动画、WebSocket实时数据、K线折线等各种图表，iframe嵌套H5/App，替换js数据即可，满足您会议展览、业务监控、风险预警、数据分析展示等多种展示需求，Gitee点个 Star 关注更新，笔芯♥️～', 'Kevin', 1664223123161, 1, 23, 11, 4, 'https://cdn.zhoukaiwen.com/logo.png,https://cdn.zhoukaiwen.com/dataVIS3.png,https://cdn.zhoukaiwen.com/FuxvCunodm6xzJLo_W_TMuZm17CQ');
INSERT INTO `blogs` VALUES (6, 2, '前端铺子0922', 'https://cdn.zhoukaiwen.com/dataVIS3.png', '这是前端铺子0922', 'kevin', 1664223134656, 1, 0, 1, 1, 'https://cdn.zhoukaiwen.com/FklNgJGcm-PqdLNr7NhU3fVptmu6,https://cdn.zhoukaiwen.com/FuKhYkmUYaAgxxWyl4KnrZMurjeh,https://cdn.zhoukaiwen.com/FmOpBOjyNhByQby_tmvrO7isfs50');
INSERT INTO `blogs` VALUES (9, 4, '前端铺子NodeJS后端来啦~', 'https://cdn.zhoukaiwen.com/Fpb1vjnDM1L343kzL5lyuKOFREKC', '基于Nodejs+Nodemon+MySQL制作的前端铺子后端它来了：更简易的代码（一看就会）、更优秀的性能（高并发）、更简单的运行部署（傻瓜式安装），专职做开源！开源不易，麻烦各位同行的小伙伴gitee上点点赞哦~ gitee地址：https://gitee.com/kevin_chou/qdpz-nodejs', 'kevin', 1664226229566, 1, 0, 1, 1, '');
INSERT INTO `blogs` VALUES (20, 4, '12', 'https://cdn.zhoukaiwen.com/Fh1ERDwZXrQ_13YVHq4Rz3asIWX9', '123', 'kevin', 1664230647921, 1, 0, 0, 0, 'https://cdn.zhoukaiwen.com/FlngxwQHeey8akWrzxzTysqmrvxF');

-- ----------------------------
-- Table structure for consignment
-- ----------------------------
DROP TABLE IF EXISTS `consignment`;
CREATE TABLE `consignment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectShow` int NOT NULL DEFAULT 0,
  `projectName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` int NOT NULL,
  `price` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contact` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `imgList` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `videoList` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of consignment
-- ----------------------------
INSERT INTO `consignment` VALUES (2, 0, '标题标题标题', 1, '45', '18629591093', 'https://qdpz.zhoukaiwen.com/', '描述描述描述描述描述描述', 'https://cdn.zhoukaiwen.com/1.jpg,https://cdn.zhoukaiwen.com/2.jpg', NULL);

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login`  (
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'wblx18629591093hz',
  PRIMARY KEY (`password`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('kevin1093', 'kevin', 'wblx18629591093hz');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL DEFAULT 1,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` bigint NOT NULL,
  `state` int NOT NULL DEFAULT 1,
  `seeNum` int NOT NULL DEFAULT 0,
  `likesNum` int NULL DEFAULT 0,
  `commentNum` int NULL DEFAULT 0,
  `imgList` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (1, 2, '前端铺子', 'https://cdn.zhoukaiwen.com/dataVIS3.png', '这是前端铺子', 'Kevin', 1664231737175, 1, 3, 3, 3, 'https://cdn.zhoukaiwen.com/FuKhYkmUYaAgxxWyl4KnrZMurjeh');
INSERT INTO `project` VALUES (2, 1, '数据可视化大屏电子沙盘集合xg2', 'https://cdn.zhoukaiwen.com/dataVIS3.png', '数据可视化大屏电子沙盘集合，基于：html/da含行业：区块链金融行业...', 'Kevin', 1663623119746, 1, 0, 0, 0, NULL);

SET FOREIGN_KEY_CHECKS = 1;
