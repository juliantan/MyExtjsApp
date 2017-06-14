var mysql = require('./mirrordb');

function KpiConfigModel(RefTable, KpiName, Formula, KpiUnit, ID) {
	this.RefTable = RefTable;
	this.KpiName = KpiName;
	this.Formula = Formula;
	this.KpiUnit = KpiUnit;
	this.ID = ID;
}

//新建
KpiConfigModel.prototype.save = function save(callback) {
	var kpi_config = {
		RefTable: this.RefTable,
		KpiName: this.KpiName,
		Formula: this.Formula,
		KpiUnit: this.KpiUnit,
	};
	var sql = 'INSERT INTO `tbl_conf_kpi` SET ?';
	console.log("KpiConfigModel.get SQL:" + sql + ", params:" + kpi_config);
	var query = mysql.query(sql, kpi_config, function(err, result) {
		if(err){
			callback(err);
		} else {
			callback(err, result);
		}
	});
};

KpiConfigModel.get = function get(query, callback){
	var sql = 'SELECT * FROM `tbl_conf_kpi` ORDER BY ID ASC ' + (query ? query : '');
	console.log("KpiConfigModel.get SQL:" + sql);
	mysql.query(sql, function(err, rows, fields) {
		if(err){
			callback(err);
		} else {
			callback(err, rows);
		}
	});
};

KpiConfigModel.getQuantity = function get(callback){
	var sql = 'SELECT COUNT(*) AS total FROM `tbl_conf_kpi`'
	console.log("KpiConfigModel.getQuantity SQL:" + sql);
	mysql.query(sql, function(err, rows) {
		if(err){
			callback(err);
		} else {
			callback(err, rows[0].total);
		}
	});
};

//改
KpiConfigModel.prototype.update = function (callback) {
	var sql = 'update `tbl_conf_kpi` set RefTable = ?, ' +
					'KpiName = ?, ' +
					'Formula = ?, ' +
					'KpiUnit = ? where ID = ?';
	var params = [this.RefTable,
					this.KpiName,
					this.Formula,
					this.KpiUnit,
					this.ID];
	console.log("KpiConfigModel.prototype.update SQL:" + sql + ", params:" + params);
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
KpiConfigModel.remove = function(query, callback) {
	var sql = 'DELETE FROM	`tbl_conf_kpi` WHERE ' + query;
	console.log("KpiConfigModel.remove SQL:" + sql);
	mysql.query(sql, function(err, result){
		if (err) {
			callback(err);
		} else {
			callback(err, result);
		}
	});
};

module.exports = KpiConfigModel;
