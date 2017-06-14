var mysql = require('./mirrordb');

function ReportConfigModel(MirrorId, Title, TableName, ParentId, ID) {
	this.MirrorId = MirrorId;
	this.Title = Title;
	this.TableName = TableName;
	this.ParentId = ParentId;
	this.ID = ID;
}

//新建
ReportConfigModel.prototype.save = function save(callback) {
	var report_config = {
		MirrorId: this.MirrorId,
		Title: this.Title,
		TableName: this.TableName,
		ParentId: this.ParentId,
	};
	var sql = 'INSERT INTO `tbl_conf_report` SET ?';
	console.log("ReportConfigModel.save SQL:" + sql + ", params:" + report_config);
	var query = mysql.query(sql, report_config, function(err, result) {
		if(err){
			callback(err);
		} else {
			callback(err, result);
		}
	});
};

ReportConfigModel.get = function get(query, callback){
	var sql = 'SELECT * FROM `tbl_conf_report` ORDER BY ID ASC ' + (query ? query : '');
	console.log("ReportConfigModel.get SQL:" + sql);
	mysql.query(sql, function(err, rows, fields) {
		if(err){
			callback(err);
		} else {
			callback(err, rows);
		}
	});
};

ReportConfigModel.getQuantity = function get(callback){
	var sql = 'SELECT COUNT(*) AS total FROM `tbl_conf_report`'
	console.log("ReportConfigModel.getQuantity SQL:" + sql);
	mysql.query(sql, function(err, rows) {
		if(err){
			callback(err);
		} else {
			callback(err, rows[0].total);
		}
	});
};

//改
ReportConfigModel.prototype.update = function (callback) {
	var sql = 'update `tbl_conf_report` set MirrorId = ?, ' +
					'Title = ?, ' +
					'TableName = ?, ' +
					'ParentId = ? where ID = ?';
	var params = [this.MirrorId,
					this.Title,
					this.TableName,
					this.ParentId,
					this.ID];
	console.log("ReportConfigModel.prototype.update SQL:" + sql + ", params:" + params);
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
ReportConfigModel.remove = function(query, callback) {
	var sql = 'DELETE FROM	`tbl_conf_report` WHERE ' + query;
	console.log("ReportConfigModel.remove SQL:" + sql);
	mysql.query(sql, function(err, result){
		if (err) {
			callback(err);
		} else {
			callback(err, result);
		}
	});
};

module.exports = ReportConfigModel;
