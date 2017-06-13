var TableConfigModel = require('../models/table_config_model.js');

var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/tableconfigs', function(req, res) {
	var totalCount = 0;
	var query = "limit " + req.query.start + "," + req.query.limit
	TableConfigModel.getQuantity(function(err, total){
		console.log(total);
		totalCount = total;
	});
	TableConfigModel.get(query, function(err, items){
		if(err){
			items = [];
		}
		res.contentType('json');
		res.json({success: true, data: items, totalCount: totalCount});
	});
});

router.post('/tableconfigs', function(req, res) {
	table_config = new TableConfigModel(req.body.RefTable, req.body.ColName, req.body.ColType);
	table_config.save(function(err, result){
		if(err){
			console.log('发布失败!' + err);
			res.json({success: false});
		} else {
			console.log('发布成功!');
			//insertId用于更新页面表单中的id
			table_config.ID = result.insertId;
			res.json({success: true, data: table_config});
		}
	});
});

router.put('/tableconfigs/:id', function(req, res) {
	table_config = new TableConfigModel(req.body.RefTable, req.body.ColName, req.body.ColType, req.body.ID);
	table_config.update(function(err, result){
		if(err){
			console.log('修改失败!' + err);
			res.json({success: false});
		} else {
			console.log('修改成功!');
			res.contentType('json');
			res.json({success: true, data: table_config});
		}
	});
});

router.delete('/tableconfigs/:id', function(req, res) {
	var query = 'id = ' + req.body.ID;
	TableConfigModel.remove(query, function(err) {
		if(err){
			console.log('删除失败!' + err);
			return res.json({success: false});
		} else {
			console.log('删除成功!');
			res.json({success: true});
		}
	});
});

