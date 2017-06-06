var Article = require('../models/article.js');
var Report = require('../models/report_model.js');

var express = require('express');
var router = express.Router();



module.exports = router;

  router.get('/', function(req, res){
    Article.get(null, function(err, articles){
      if(err){
        articles = [];
      }
      res.render('index', {
        title    : '主页',
        articles : articles
      });
    });
  });

  // 文章清单
  router.get('/articles', function(req, res) {
    var totalCount = 0;
    query= "limit " + req.query.start + "," + req.query.limit
    Article.getQuantity(function(err, total){
      console.log(total);
      totalCount = total;
    });
    Article.get(query, function(err, articles){
      if(err){
        articles = [];
      }
      res.contentType('json');
      res.json({success: true, data: articles, totalCount: totalCount});
    });
  });

  // 新建文章
  router.post('/articles', function(req, res) {
    article = new Article(req.body.user, req.body.title, req.body.content, req.body.happened_at);
    article.save(function(err, result){
      if(err){
        console.log('发布失败!');
        res.json({success: false});
      }
      console.log('发布成功!');
      //insertId用于更新页面表单中的id
      article.id = result.insertId;
      res.json({success: true, data: article});
    });
  });

  // 编辑文章
  router.put('/articles/:id', function(req, res) {
    article = new Article(req.body.user, req.body.title, req.body.content, req.body.happened_at, req.body.id);
    article.update(function(err, result){
      if(err){
        console.log('修改失败!');
        res.json({success: false});
      }
      console.log('修改成功!');
      res.contentType('json');
      res.json({success: true, data: article});
    });
  });

  // 删除文章
  router.delete('/articles/:id', function(req, res) {
    var query = 'id = ' + req.body.id;
    Article.remove(query, function(err) {
      if(err){
        console.log('删除失败!');
        return res.json({success: false});
      }
      console.log('删除成功!');
      res.json({success: true});
    });
  });

  
router.get('/getReportList.do', function(req, res) {
    var totalCount = 0;
    var query = null;
    if (req.query.node != null && req.query.node != '') {
    	query = "WHERE ParentId = '" + req.query.node + "'";
    } else {
    	query = "WHERE ParentId IS NULL";
    }
    Report.getQuantity(function(err, total){
      totalCount = total;
    });
    Report.get(query, function(err, reports){
      if(err){
        reports = [];
      }
      res.contentType('json');
      res.json({success: true, data: reports, totalCount: totalCount});
    });
});

function getReportDateIndex(reports, this_date) {
	for (var i = 0; i < reports.length; i++) {
		if ((new Date(reports[i]['date'])).getTime() == (new Date(this_date)).getTime()) {
			return i;
		}
	}
	return -1;
}

function patchTrendData(reports, from_date, to_date) {
	var fromdate = new Date(from_date).getTime();
	var todate = new Date(to_date).getTime();
	var merge_reports = []
	var d = fromdate;
	while (d <= todate) {
		var idx = getReportDateIndex(reports, d);
		if (idx >= 0) {
			merge_reports.push(reports[idx]);
		} else {
			merge_reports.push({date: new Date(d), m1: ''});
		}
		d = d + 3600 * 24 * 1000;
		idx++;
	}
	return merge_reports;
}

router.get('/getTrendData.do', function(req, res) {
	var measuresql = req.query.kpi_formula + ' AS m1, date';
    var wheresql = " WHERE Date >= '" + req.query['from_date'] + "' AND Date <= '" + req.query['to_date'] + "'";
    var dmsql = ' GROUP BY date';
    //a). fixed filters
    if (req.query['hcdn_version'] != null) {
    	wheresql += " AND HcdnVersion IN ('" + req.query['hcdn_version'] + "')";
    }
    if (req.query['ua'] != null) {
    	wheresql += " AND UA IN ('" + req.query['ua'] + "')";
    }
    //b). dynamic filters
    if (req.query['dynamic_filter_cnt'] != 0) {
    	for (var i = 0; i < req.query['dynamic_filter_cnt']; i++) {
    		var dynamic_filter_name = req.query['dynamic_filter_name' + i];
    		if (dynamic_filter_name != null && dynamic_filter_name != '' && dynamic_filter_name != 'None') {
    			var dynamic_filter_value = req.query['dynamic_filter_value' + i];
    			dynamic_filter_value = dynamic_filter_value != null ? dynamic_filter_value : '';
    			wheresql += " AND " + dynamic_filter_name + " IN ('" + dynamic_filter_value + "')";
    		}
    	}
    }
    //c). dimension
    /*var dimension = req.query['dimension_name'];
    if (dimension != null && dimension != '') {
    	measuresql += ', ' + dimension;
    	dmsql += ' , ' + dimension;
    }*/

    getTrendData_from_date = req.query.from_date;
    getTrendData_to_date = req.query.to_date;
    var sql = 'SELECT ' + measuresql + ' FROM ' + req.query.tbl_name + (wheresql != null ? wheresql : '') + (dmsql != null ? dmsql : '');
    Report.getData(sql, function(err, reports){
      if(err){
        reports = [];
      }
      reports = patchTrendData(reports, getTrendData_from_date, getTrendData_to_date);
      res.contentType('json');
      res.json({success: true, data: reports});
    });
});

router.get('/getTopNData.do', function(req, res) {
	var measuresql = req.query.kpi_formula + ' AS m1, date';
    var wheresql = " WHERE Date >= '" + req.query['from_date'] + "' AND Date <= '" + req.query['to_date'] + "'";
    var dmsql = ' GROUP BY date';
    //a). fixed filters
    if (req.query['hcdn_version'] != null) {
    	wheresql += " AND HcdnVersion IN ('" + req.query['hcdn_version'] + "')";
    }
    if (req.query['ua'] != null) {
    	wheresql += " AND UA IN ('" + req.query['ua'] + "')";
    }
    //b). dynamic filters
    if (req.query['dynamic_filter_cnt'] != 0) {
    	for (var i = 0; i < req.query['dynamic_filter_cnt']; i++) {
    		var dynamic_filter_name = req.query['dynamic_filter_name' + i];
    		if (dynamic_filter_name != null && dynamic_filter_name != '' && dynamic_filter_name != 'None') {
    			var dynamic_filter_value = req.query['dynamic_filter_value' + i];
    			dynamic_filter_value = dynamic_filter_value != null ? dynamic_filter_value : '';
    			wheresql += " AND " + dynamic_filter_name + " IN ('" + dynamic_filter_value + "')";
    		}
    	}
    }
    //c). dimension
    /*var dimension = req.query['dimension_name'];
    if (dimension != null && dimension != '') {
    	measuresql += ', ' + dimension;
    	dmsql += ' , ' + dimension;
    }*/

    getTrendData_from_date = req.query.from_date;
    getTrendData_to_date = req.query.to_date;
    var sql = 'SELECT ' + measuresql + ' FROM ' + req.query.tbl_name + (wheresql != null ? wheresql : '') + (dmsql != null ? dmsql : '');
    Report.getData(sql, function(err, reports){
      if(err){
        reports = [];
      }
      reports = patchTrendData(reports, getTrendData_from_date, getTrendData_to_date);
      res.contentType('json');
      res.json({success: true, data: reports});
    });
});

router.get('/getDimValues.do', function(req, res) {
    Report.getDimValues(req.query.tbl_name, req.query.dim_name, function(err, datas){
      if(err){
        datas = [];
      }
      res.contentType('json');
      res.json({success: true, data: datas});
    });
});

router.get('/getDimensions.do', function(req, res) {
    Report.getDimensions(req.query.tbl_name, function(err, datas){
      if(err){
        datas = [];
      }
      res.contentType('json');
      res.json({success: true, data: datas});
    });
});

router.get('/getMeasures.do', function(req, res) {
    Report.getMeasures(req.query.tbl_name, function(err, datas){
      if(err){
        datas = [];
      }
      res.contentType('json');
      res.json({success: true, data: datas});
    });
});

router.get('/getKpis.do', function(req, res) {
    Report.getKpis(req.query.tbl_name, function(err, datas){
      if(err){
        datas = [];
      }
      res.contentType('json');
      res.json({success: true, data: datas});
    });
});
