var Report = require('../models/report_model.js');

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function(req, res){
	res.render('index', {
		title: '主页',
	});
});

router.get('/getReportList.do', function(req, res) {
    var totalCount = 0;
    var query = null;
    if (req.query.node != null && req.query.node != '') {
    	query = "WHERE ParentId = '" + req.query.node + "'";
    } else {
    	query = "WHERE ParentId IS NULL OR ParentId = '0'";
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

function makeFilterForWhere(req, wheresql) {
    //a). fixed filters
    if (req.query['hcdn_version'] != null) {
    	wheresql += " AND HcdnVersion IN ('" + req.query['hcdn_version'] + "')";
    }
    if (req.query['ua'] != null) {
    	wheresql += " AND UA IN ('" + req.query['ua'] + "')";
    }
    //b). dynamic filters
    if (req.query['dynamic_filter_cnt'] != 0) {
    	var subwheresql = '';
    	for (var i = 0; i < req.query['dynamic_filter_cnt']; i++) {
    		var dynamic_filter_name = req.query['dynamic_filter_name' + i];
    		var sub_relation = req.query['dynamic_filter_relation'];
    		if (dynamic_filter_name != null && dynamic_filter_name != '' && dynamic_filter_name != 'None') {
    			var dynamic_filter_op = req.query['dynamic_filter_op' + i];
    			var dynamic_filter_value = req.query['dynamic_filter_value' + i];
    			var dynamic_filter_revert = req.query['dynamic_filter_revert' + i];
    			dynamic_filter_value = dynamic_filter_value != null ? dynamic_filter_value : '';
    			var revert = (dynamic_filter_revert == 'true') ? "NOT" : "";
    			if (subwheresql != '') {
    				subwheresql += " " + sub_relation
    			}
    			subwheresql += " " + revert + " " + dynamic_filter_name + " " + dynamic_filter_op;
    			if (dynamic_filter_op == 'IN') {
    				var in_items = dynamic_filter_value.replace(', ', ',').split(',');
    				var ins = '';
    				for (var j = 0; j < in_items.length; j++) {
    					if (ins != '') {
    						ins += ',';
    					}
    					ins += "'" + in_items[j] + "'";
    				}
    				subwheresql +=" (" + ins + ")";
    			} else {
    				subwheresql +=" '" + dynamic_filter_value + "'";
    			}
    		}
    	}
    	if (subwheresql != '') {
    		wheresql += " AND (" + subwheresql + ")";
    	}
    }
    return wheresql;
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
    
    wheresql = makeFilterForWhere(req, wheresql);

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

function makeDimensionSql(req, is_for_total) {
	var measuresql = req.query.kpi_formula + ' AS m1, date';
    var wheresql = " WHERE Date = '" + req.query['top_date'] + "'";
    var dmsql = ' GROUP BY date';
    var ordersql = ' ORDER BY m1 ';
    var limitsql = null;

    wheresql = makeFilterForWhere(req, wheresql);

    // dimension
    var dimension = req.query['dimension_name'];
    if (!is_for_total && dimension != null && dimension != '') {
    	measuresql += ', ' + dimension + ' AS dm';
    	dmsql += ' , ' + dimension;
    }
    if (req.query['top_n'] != null && req.query['top_n'] != 0) {
		limitsql = ' LIMIT ' + req.query['top_n'];
	}
    if (req.query['order'] != null && req.query['order'] != 0) {
		ordersql += req.query['order'];
	}

    getTopNData_from_date = req.query.top_date;
    getTopNData_to_date = req.query.top_date;
    var sql = 'SELECT ' + measuresql + ' FROM ' + req.query.tbl_name + (wheresql != null ? wheresql : '') + (dmsql != null ? dmsql : '') + (ordersql != null ? ordersql : '') + (limitsql != null ? limitsql : '');
    
    return sql;
}

router.get('/getTopNData.do', function(req, res) {
    var dsql = makeDimensionSql(req);
    Report.getData(dsql, function(err, reports){
		if(err) {
			reports = [];
		}
		res.contentType('json');
		reports.reverse();
		res.json({success: true, data: reports});
    });
});

router.get('/getPieData.do', function(req, res) {
	getPieData_tsql = makeDimensionSql(req, true);
    Report.getData(getPieData_tsql, function(err, treports){
		if(err) {
			treports = [];
			res.contentType('json');
			reports.reverse();
			res.json({success: true, data: treports});
		} else {
			getPieData_total = treports[0].m1;
			var dsql = makeDimensionSql(req, false);
		    Report.getData(dsql, function(err, reports){
				if(err) {
				  reports = [];
				}
				res.contentType('json');
				reports.reverse();
				
				// Add others and total information
				if (getPieData_tsql.search('SUM\\(') >= 0) {
					var topTotal = 0;
					for (var i = 0; i < reports.length; i++) {
						reports[i].total = getPieData_total;
						topTotal += reports[i].m1;
					}
					var otherTotal = getPieData_total - topTotal;
					if (reports.length > 0 && reports[0].dm != null) {
						var d = reports[0].date;
						reports.push({date: d, dm: 'Others', m1: otherTotal, total: getPieData_total});
					}
				}
				
				res.json({success: true, data: reports});
		    });
		}
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

router.get('/getDimensionAndMeasures.do', function(req, res) {
    Report.getDimensionAndMeasures(req.query.tbl_name, function(err, datas){
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
