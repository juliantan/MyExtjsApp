var ReportConfigModel = require('../models/report_config_model.js');

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/reportconfigs', function(req, res) {
	var totalCount = 0;
	var query = "limit " + req.query.start + "," + req.query.limit
	ReportConfigModel.getQuantity(function(err, total){
		console.log(total);
		totalCount = total;
	});
	ReportConfigModel.get(query, function(err, items){
		if(err){
			items = [];
		}
		res.contentType('json');
		res.json({success: true, data: items, totalCount: totalCount});
	});
});

router.post('/reportconfigs', function(req, res) {
	report_config = new ReportConfigModel(req.body.MirrorId, req.body.Title, req.body.TableName, req.body.ParentId == '' ? '0' : req.body.ParentId);
	report_config.save(function(err, result){
		if(err){
			console.log('发布失败!' + err);
			res.json({success: false});
		} else {
			console.log('发布成功!');
			//insertId用于更新页面表单中的id
			report_config.ID = result.insertId;
			res.json({success: true, data: report_config});
		}
	});
});

router.put('/reportconfigs/:id', function(req, res) {
	report_config = new ReportConfigModel(req.body.MirrorId, req.body.Title, req.body.TableName, req.body.ParentId == '' ? '0' : req.body.ParentId, req.body.ID);
	report_config.update(function(err, result){
		if(err){
			console.log('修改失败!' + err);
			res.json({success: false});
		} else {
			console.log('修改成功!');
			res.contentType('json');
			res.json({success: true, data: report_config});
		}
	});
});

router.delete('/reportconfigs/:id', function(req, res) {
	var query = 'id = ' + req.body.ID;
	ReportConfigModel.remove(query, function(err) {
		if(err){
			console.log('删除失败!' + err);
			return res.json({success: false});
		} else {
			console.log('删除成功!');
			res.json({success: true});
		}
	});
});

