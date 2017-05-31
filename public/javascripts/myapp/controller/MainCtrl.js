/**
 * 程序主控制器
 */
Ext.define("Mirror.controller.MainCtrl",{
  extend: "Ext.app.Controller",

  refs:[
    {ref: 'menu', selector: 'tabPanel'}
  ],

  init: function(){
    this.control({
      'menu': {
         itemmousedown: this.loadMenu
      }
    })
  },
  
  views: ['chart.TrendColumn', 'chart.TopDimension', 'chart.PieChart'],

  loadMenu: function(selModel, record){
    console.log("record.get('id'):" + record.get('id'));
    if (record.get('leaf')) {
      var my = this;
      var panel = Ext.getCmp(record.get('id'));
      if (!panel) {
        switch (record.get('id')) {
          case "10":
            Ext.require('Mirror.controller.ArticleCtrl', function() {
              var article = new Mirror.controller.ArticleCtrl();
              article.init(Mirror);
              panel = { xtype: 'article-list-widget' };
              my.openTab(panel, 'article-list-leaf-id');
            });
            break;
          case "node-switch":
              panel = {
				title: record.get('text'),
				//xtype: 'trend-column-widget',
				xtype: 'panel',
				layout: 'anchor',
				margin: '0 0 0 0',
				items: [
					{
						xtype: 'trend-column-widget',
						anchor: '100% 50%',
						id: "node-switch-1"
					},
					{
						xtype: 'top-dimension-widget',
						anchor: '100% 50%',
						id: "node-switch-2",
					},
				],
				closable: true,
              };
              my.openTab(panel, record.get('id'));
            break;
          case "1":
              panel = {
				title: record.get('text'),
				//xtype: 'trend-column-widget',
				xtype: 'panel',
				layout: 'anchor',
				margin: '0 0 0 0',
				items: [
					{
						xtype: 'panel',
						anchor: '100% 50%',
						id: "user-count-leaf-id-1",
						layout: 'anchor',
						border: true,
						title: '趋势图',
						collapsible: true,
						items: [
							{
								xtype: 'trend-column-widget',
								id: 'user-count-leaf-id-1-1',
								anchor: '100% 100%',
							},
						],
					},
					{
						xtype: 'panel',
						anchor: '100% 50%',
						id: "user-count-leaf-id-2",
						layout: 'anchor',
						border: true,
						title: '维度图',
						collapsible: true,
						items: [
							{ xtype: 'top-dimension-widget', id: 'top-dimension-widget-123', anchor: '50% 100%',},
							{ xtype: 'pie-chart-widget', id: 'pie-chart-widget-124', anchor: '50% 100%',}
						],
					},
				],
				closable: true,
              };
              my.openTab(panel, record.get('id'));
            break;
          default:
            panel = {
              title: 'New Tab ' + record.get('id'),
              //iconCls: 'tabs',
              html: 'Tab Body ' + record.get('id') + '<br/><br/>',
              closable: true
            };
            my.openTab(panel, record.get('id'));
        };
        //this.openTab(panel,record.get('id'));
      } else {
        var main = Ext.getCmp("content-panel");
        main.setActiveTab(panel);
      }
    } else {
      console.log("not leaf");
    }
  },

  openTab: function(panel, id){
    var o = (typeof panel == "string" ? panel : id || panel.id);
    var main = Ext.getCmp("content-panel");
    var tab = main.getComponent(o);
    if (tab) {
      main.setActiveTab(tab);
    } else if(typeof panel!="string"){
      panel.id = o;
      var p = main.add(panel);
      main.setActiveTab(p);
    }
  }

});
