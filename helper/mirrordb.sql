/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.7.16-0ubuntu0.16.04.1 : Database - mirrordb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mirrordb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `mirrordb`;

/*Table structure for table `tbl_conf_col` */

DROP TABLE IF EXISTS `tbl_conf_col`;

CREATE TABLE `tbl_conf_col` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `RefTable` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ColName` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ColType` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `tbl_conf_col` */

insert  into `tbl_conf_col`(`ID`,`RefTable`,`ColName`,`ColType`) values (1,'tbl_hcdn_switch','HcdnVersion',0),(2,'tbl_hcdn_switch','UA',0),(3,'tbl_hcdn_switch','TotalTaskCnt',1),(4,'tbl_hcdn_switch','SwitchedTaskCnt',1),(5,'tbl_hcdn_switch','SwitchRatio',1),(6,'tbl_hcdn_user_count','HcdnVersion',0),(7,'tbl_hcdn_user_count','UserCount',1),(8,'tbl_hcdn_qtp_summary','HcdnVersion',0),(9,'tbl_hcdn_qtp_summary','UA',0),(10,'tbl_hcdn_qtp_summary','Platform',0),(11,'tbl_hcdn_qtp_summary','Province',0),(12,'tbl_hcdn_qtp_summary','ReqIp',0),(13,'tbl_hcdn_qtp_summary','CurlVersion',0),(14,'tbl_hcdn_qtp_summary','ReqMod',0),(15,'tbl_hcdn_qtp_summary','HttpCode',0),(16,'tbl_hcdn_qtp_summary','ReqDomain',0),(17,'tbl_hcdn_qtp_summary','ISP',0),(18,'tbl_hcdn_qtp_summary','SucCnt',1),(19,'tbl_hcdn_qtp_summary','FailCnt',1),(20,'tbl_hcdn_qtp_summary','TotalCnt',1),(22,'tbl_hcdn_qtp_speedtest','Hour',0),(23,'tbl_hcdn_qtp_speedtest','HcdnVerion',0),(24,'tbl_hcdn_qtp_speedtest','UA',0),(25,'tbl_hcdn_qtp_speedtest','ProvinceName',0),(26,'tbl_hcdn_qtp_speedtest','IspName',0),(27,'tbl_hcdn_qtp_speedtest','FecFlag',0),(28,'tbl_hcdn_qtp_speedtest','TcpSpeed',1),(29,'tbl_hcdn_qtp_speedtest','UdtSpeed',1),(30,'tbl_hcdn_qtp_speedtest','TBW',0),(31,'tbl_hcdn_qtp_speedtest','UBW',0),(32,'tbl_hcdn_qtp_speedtest','UgteT10',0),(33,'tbl_hcdn_qtp_speedtest','UgteT30',0),(34,'tbl_hcdn_qtp_speedtest','UgteT50',0),(35,'tbl_hcdn_qtp_speedtest','UgteT70',0),(36,'tbl_hcdn_qtp_speedtest','TgteU10',0),(37,'tbl_hcdn_qtp_speedtest','TgteU30',0),(38,'tbl_hcdn_qtp_speedtest','TgteU50',0),(39,'tbl_hcdn_qtp_speedtest','TgteU70',0),(40,'tbl_hcdn_qtp_speedtest','Attempt',1),(41,'tbl_hcdn_qtp_speedtest','BW',0),(42,'tbl_hcdn_qtp_speedtest','UgtT',0),(43,'tbl_hcdn_qtp_speedtest','TgtU',0);

/*Table structure for table `tbl_conf_kpi` */

DROP TABLE IF EXISTS `tbl_conf_kpi`;

CREATE TABLE `tbl_conf_kpi` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `RefTable` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `KpiName` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Formula` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `KpiUnit` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `KpiDataFormat` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `tbl_conf_kpi` */

insert  into `tbl_conf_kpi`(`ID`,`RefTable`,`KpiName`,`Formula`,`KpiUnit`,`KpiDataFormat`) values (1,'tbl_hcdn_switch','HCDN切换率','AVG(SwitchRatio)*10000','x/10000',NULL),(2,'tbl_hcdn_switch','HCDN切换任务数','SUM(SwitchedTaskCnt)','','000,000'),(3,'tbl_hcdn_user_count','用户量','SUM(UserCount)','','000,000'),(4,'tbl_hcdn_qtp_summary','失败率','SUM(FailCnt)/SUM(TotalCnt)*100','%','0.00'),(5,'tbl_hcdn_qtp_summary','成功率','SUM(SucCnt)/SUM(TotalCnt)*100','%','0.00'),(6,'tbl_hcdn_qtp_summary','请求总数','SUM(TotalCnt)','','000,000'),(7,'tbl_hcdn_qtp_summary','失败请求数','SUM(FailCnt)','','000,000'),(8,'tbl_hcdn_qtp_summary','成功请求数','SUM(SucCnt)','','000,000'),(10,'tbl_hcdn_qtp_speedtest','测速次数','SUM(attempt)','','000,000'),(11,'tbl_hcdn_qtp_speedtest','UDT优于TCP测速占比','CAST(SUM((CASE WHEN (udtspeed > tcpspeed) THEN 1 ELSE 0 END))/SUM(attempt) AS DECIMAL(9,2))','','0.00'),(12,'tbl_hcdn_qtp_speedtest','UDT平均下载速度','AVG(UdtSpeed)/1000','KB/s','000,000.00'),(13,'tbl_hcdn_qtp_speedtest','TCP平均下载速度','AVG(TcpSpeed)/1000','KB/s','000,000.00');

/*Table structure for table `tbl_conf_report` */

DROP TABLE IF EXISTS `tbl_conf_report`;

CREATE TABLE `tbl_conf_report` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `MirrorId` bigint(20) DEFAULT NULL,
  `Title` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TableName` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ParentId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `tbl_conf_report` */

insert  into `tbl_conf_report`(`ID`,`MirrorId`,`Title`,`TableName`,`ParentId`) values (1,10247,'HCDN切换率','tbl_hcdn_switch',NULL),(3,9646,'用户量','tbl_hcdn_user_count',0),(4,NULL,'QTP',NULL,NULL),(5,12214,'QTP测速成功率','tbl_qtp_speedtest',4),(7,NULL,'五分钟统计',NULL,4),(8,NULL,'错误统计',NULL,4),(9,9717,'QTPS_成功失败概览','tbl_qtp_sucfail_overview',7),(11,15510,'QTPSA_成功失败','tbl_hcdn_qtp_summary',0),(30,100,'QTP测速','tbl_hcdn_qtp_speedtest',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
