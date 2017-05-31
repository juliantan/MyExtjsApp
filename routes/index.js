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