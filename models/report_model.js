var mysql = require('./mirrordb');

function Report(id) {
  this.id = id;
}

Report.get = function get(query, callback){
  var sql = 'SELECT * FROM `tbl_report` ' + (query != null ? query : '');
  //var sql = 'SELECT * FROM `tbl_report`';
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

Report.getQuantity = function get(callback){
  var sql = 'SELECT COUNT(*) AS total FROM `tbl_report`'

  mysql.query(sql, function(err, rows) {
    if(err){
      callback(err);
    }
    callback(err, rows[0].total);
  });
};

Report.getTrendData = function getTrendData(tbl_name, query, callback){
  //var sql = 'SELECT * FROM ' + tbl_name + ' ' + (query != null ? query : '');
  var sql = 'SELECT SUM(TotalTaskCnt) as m1, date FROM ' + tbl_name + ' ' + (query != null ? query : '');
  mysql.query(sql, function(err, rows, fields) {
    if(err){
      callback(err);
    } else {
      callback(err, rows);
    }
  });
};

module.exports = Report;
