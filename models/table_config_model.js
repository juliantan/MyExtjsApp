var mysql = require('./mirrordb');

function TableConfigModel(RefTable, ColName, ColType, ID) {
	this.RefTable = RefTable;
	this.ColName = ColName;
	this.ColType = ColType;
	this.ID = ID;
}

//新建
TableConfigModel.prototype.save = function save(callback) {
	var table_config = {
		RefTable: this.RefTable,
		ColName: this.ColName,
		ColType: this.ColType,
	};
	var sql = 'INSERT INTO `tbl_conf_col` SET ?';
	console.log("TableConfigModel.get SQL:" + sql + ", params:" + table_config);
	var query = mysql.query(sql, table_config, function(err, result) {
		if(err){
			callback(err);
		} else {
			callback(err, result);
		}
	});
};

TableConfigModel.get = function get(query, callback){
	var sql = 'SELECT * FROM `tbl_conf_col` ORDER BY RefTable ASC, ColType ASC, ColName ASC ' + (query ? query : '');
	console.log("TableConfigModel.get SQL:" + sql);
	mysql.query(sql, function(err, rows, fields) {
		if(err){
			callback(err);
		} else {
			callback(err, rows);
		}
	});
};

TableConfigModel.getQuantity = function get(callback){
	var sql = 'SELECT COUNT(*) AS total FROM `tbl_conf_col`'
	console.log("TableConfigModel.getQuantity SQL:" + sql);
	mysql.query(sql, function(err, rows) {
		if(err){
			callback(err);
		} else {
			callback(err, rows[0].total);
		}
	});
};

//改
TableConfigModel.prototype.update = function (callback) {
	var sql = 'update `tbl_conf_col` set RefTable = ?, ' +
					'ColName = ?, ' +
					'ColType = ? where ID = ?';
	var params = [this.RefTable,
					this.ColName,
					this.ColType,
					this.ID];
	console.log("TableConfigModel.prototype.update SQL:" + sql + ", params:" + params);
	mysql.query(sql, params, function (err, result) {
		if (err) {
		console.log("ERROR:" + err);
		callback(err);
		} else {
			callback(err, result);
		}
	});
}

//删
TableConfigModel.remove = function(query, callback) {
	var sql = 'DELETE FROM	`tbl_conf_col` WHERE ' + query;
	console.log("TableConfigModel.remove SQL:" + sql);
	mysql.query(sql, function(err, result){
		if (err) {
			callback(err);
		} else {
			callback(err, result);
		}
	});
};

module.exports = TableConfigModel;
