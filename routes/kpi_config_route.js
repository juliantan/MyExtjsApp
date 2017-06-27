var KpiConfigModel = require('../models/kpi_config_model.js');

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/kpiconfigs', function(req, res) {
	var totalCount = 0;
	var query = "limit " + req.query.start + "," + req.query.limit
	KpiConfigModel.getQuantity(function(err, total){
		console.log(total);
		totalCount = total;
	});
	KpiConfigModel.get(query, function(err, items){
		if(err){
			items = [];
		}
		res.contentType('json');
		res.json({success: true, data: items, totalCount: totalCount});
	});
});

router.post('/kpiconfigs', function(req, res) {
	kpi_config = new KpiConfigModel(req.body.RefTable, req.body.KpiName, req.body.Formula, req.body.KpiUnit, req.body.KpiDataFormat);
	kpi_config.save(function(err, result){
		if(err){
			console.log('发布失败!' + err);
			res.json({success: false});
		} else {
			console.log('发布成功!');
			//insertId用于更新页面表单中的id
			kpi_config.ID = result.insertId;
			res.json({success: true, data: kpi_config});
		}
	});
});

router.put('/kpiconfigs/:id', function(req, res) {
	kpi_config = new KpiConfigModel(req.body.RefTable, req.body.KpiName, req.body.Formula, req.body.KpiUnit, req.body.KpiDataFormat, req.body.ID);
	kpi_config.update(function(err, result){
		if(err){
			console.log('修改失败!' + err);
			res.json({success: false});
		} else {
			console.log('修改成功!');
			res.contentType('json');
			res.json({success: true, data: kpi_config});
		}
	});
});

router.delete('/kpiconfigs/:id', function(req, res) {
	var query = 'id = ' + req.body.ID;
	KpiConfigModel.remove(query, function(err) {
		if(err){
			console.log('删除失败!' + err);
			return res.json({success: false});
		} else {
			console.log('删除成功!');
			res.json({success: true});
		}
	});
});

