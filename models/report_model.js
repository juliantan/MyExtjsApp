var mysql = require('./mirrordb');

function Report(id) {
  this.id = id;
}

Report.get = function get(query, callback){
  //var sql = 'SELECT * FROM `tbl_report`' + (query ? query : '')
  var sql = 'SELECT * FROM `tbl_report`'
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

module.exports = Report;
