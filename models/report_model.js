var mysql = require('./mirrordb');

function Report(id) {
  this.id = id;
}

Report.get = function get(query, callback){
  var sql = 'SELECT * FROM `tbl_conf_report` ' + (query != null ? query : '');
  //var sql = 'SELECT * FROM `tbl_conf_report`';
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      console.error("get error:" + err + ', SQL:' + sql);
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

Report.getQuantity = function get(callback){
  var sql = 'SELECT COUNT(*) AS total FROM `tbl_conf_report`'

  mysql.query(sql, function(err, rows) {
    if(err){
      console.error("getQuantity error:" + err + ', SQL:' + sql);
      callback(err);
    } else {
    	callback(err, rows[0].total);
    }
  });
};

Report.getData = function getData(sql, callback){
  console.log("Report.getData SQL:" + sql);
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      console.error("Report.getData error:" + err + ', SQL:' + sql);
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

Report.getDimValues = function getDimValues(tbl_name, dim_name, callback){
  var sql = 'SELECT \'All\' AS dim from DUAL UNION (SELECT DISTINCT(' + dim_name + ') as dim FROM ' + tbl_name + ' ORDER BY dim ASC)';
  console.log("getDimValues SQL:" + sql);
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      console.error("getDimValues error:" + err + ', SQL:' + sql);
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

Report.getDimensions = function getDimensions(tbl_name, callback){
  var sql = 'SELECT \'None\' AS dim from DUAL UNION (SELECT ColName as dim FROM tbl_conf_col WHERE RefTable = \'' + tbl_name + '\' AND ColType = \'0\' ORDER BY dim ASC)';
  console.log("getDimensions SQL:" + sql);
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      console.error("getDimensions error:" + err + ', SQL:' + sql);
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

Report.getMeasures = function getMeasures(tbl_name, callback){
  var sql = 'SELECT ColName as mes FROM tbl_conf_col WHERE RefTable = \'' + tbl_name + '\' AND ColType = \'1\' ORDER BY mes ASC';
  console.log("getMeasures SQL:" + sql);
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      console.error("getMeasures error:" + err + ', SQL:' + sql);
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

Report.getDimensionAndMeasures = function getDimensionAndMeasures(tbl_name, callback) {
	var sql = 'SELECT col FROM (\
		(SELECT ColName AS col FROM tbl_conf_col WHERE RefTable = \'' + tbl_name + '\' AND ColType = \'0\' ORDER BY col ASC)\
		UNION\
		(SELECT ColName AS col FROM tbl_conf_col WHERE RefTable = \'' + tbl_name + '\' AND ColType = \'1\' ORDER BY col ASC)\
		) xxx';
	console.log("getDimensionAndMeasures SQL:" + sql);
	mysql.query(sql, function(err, rows, fields) {
		if(err){
			console.error("getDimensionAndMeasures error:" + err + ', SQL:' + sql);
			callback(err);
		} else {
			callback(err, rows);
		}
	});
};

Report.getKpis = function getKpis(tbl_name, callback){
  var sql = 'SELECT * FROM tbl_conf_kpi WHERE RefTable = \'' + tbl_name + '\' ORDER BY KpiName ASC';
  console.log("getKpis SQL:" + sql);
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      console.error("getKpis error:" + err + ', SQL:' + sql);
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

module.exports = Report;
