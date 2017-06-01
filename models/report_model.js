var mysql = require('./mirrordb');

function Report(id) {
  this.id = id;
}

Report.get = function get(query, callback){
  var sql = 'SELECT * FROM `tbl_conf_report` ' + (query != null ? query : '');
  //var sql = 'SELECT * FROM `tbl_conf_report`';
  mysql.query(sql, function(err, rows, fields) {
    if(err){
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
      callback(err);
    } else {
    	callback(err, rows[0].total);
    }
  });
};

Report.getTrendData = function getTrendData(tbl_name, measures, wheresql, dmsql, callback){
  var sql = 'SELECT ' + measures + ', date FROM ' + tbl_name + (wheresql != null ? wheresql : '') + (dmsql != null ? dmsql : '');
  console.log("getTrendData SQL:" + sql);
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

module.exports = Report;
