/*=============================================================*/
/* ShopEx database update script                               */
/*                                                             */
/*         Version:  from 30472 to 31323                       */
/*   last Modified:  2009/08/28                                */
/*=============================================================*/

/*=============================================================*/
/* Create tables                                               */
/*=============================================================*/
/*=============================================================*/
/* New columns                                                 */
/*=============================================================*/

/*=============================================================*/
/* Modify columns                                              */
/*=============================================================*/
ALTER TABLE `sdb_delivery` CHANGE COLUMN `supplier_delivery_id` `supplier_delivery_id` varchar(30) default NULL ;
ALTER TABLE `sdb_sync_tmp` CHANGE COLUMN `s_type` `s_type` enum('goods_type','spec','brand','goods_cat') default NULL ;

/*=============================================================*/
/* Index                                                       */
/*=============================================================*/
ALTER TABLE `sdb_goods` ADD INDEX `supplier_goods`(`supplier_id`,`supplier_goods_id`);
ALTER TABLE `sdb_supplier` ADD INDEX `supplier_id`(`supplier_id`);

/*=============================================================*/
/* Drop tables                                                 */
/*=============================================================*/

/*=============================================================*/
/* Drop fields                                                 */
/*=============================================================*/

/*=============================================================*/
/* Drop index                                                  */
/*=============================================================*/
