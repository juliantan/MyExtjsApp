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
         //itemmousedown: this.loadMenu,
         itemclick: this.loadMenu,
         itemdblclick: this.loadMenuWithGrid,
      }
    })
  },
  
  views: ['chart.TrendColumn', 'chart.TopDimension', 'chart.PieChart'],

  loadMenu: function(selModel, record){
    console.log("record.get('id'):" + record.get('id'));
    if (record.get('leaf')) {
      var my = this;
      var panel = Ext.getCmp(record.get('id'));
      tbl_name = record.get('tbl_name');
      if (!panel) {
        switch (record.get('id')) {
          case "10":
            Ext.require('Mirror.controller.ArticleCtrl', function() {
              var article = new Mirror.controller.ArticleCtrl();
              article.init(Mirror);
              panel = { xtype: 'article-list-widget' };
              my.openTab(panel, 'article-list-leaf-id', '');
            });
            break;
          default:
              panel = {
				title: record.get('text'),
				xtype: 'panel',
				layout: 'anchor',
				margin: '0 0 0 0',
				items: [
					{
						xtype: 'panel',
						anchor: '100% 50%',
						id: 'panel_trend_' + record.get('id'),
						layout: 'anchor',
						border: true,
						title: '趋势图',
						collapsible: true,
						items: [
							{
								xtype: 'trend-column-widget',
								id: 'trend_' + record.get('id'),
								anchor: '100% 100%',
							},
						],
					},
					{
						xtype: 'panel',
						anchor: '100% 50%',
						id: 'panel_dimension_' + record.get('id'),
						layout: 'anchor',
						border: true,
						title: '维度图',
						collapsible: true,
						items: [
							{ xtype: 'top-dimension-widget', id: 'top_' + record.get('id'), anchor: '50% 100%',},
							{ xtype: 'pie-chart-widget', id: 'pie_' + record.get('id'), anchor: '50% 100%',}
						],
					},
				],
				closable: true,
              };
              my.openTab(panel, 'tabId' + record.get('id'), record.get('tbl_name'));
            break;
        };
      } else {
        var main = Ext.getCmp("content-panel-id");
        main.setActiveTab(panel);
      }

		//Ext.ComponentMgr.get('filter-panel-id').reloadFilters();
		//Ext.ComponentMgr.get('filter-panel-id').commitForm();
    } else {
      console.log("not leaf");
    }
  },

openTab: function(panel, id, tbl_name){
    var o = (typeof panel == "string" ? panel : id || panel.id);
    var main = Ext.getCmp("content-panel-id");
    var tab = main.getComponent(o);
    if (tab) {
		main.setActiveTab(tab);
    } else if(typeof panel!="string"){
		panel.id = o;
		panel.tbl_name = tbl_name;
		console.log("openTab panel.id:" + panel.id + ', tbl_name: ' + tbl_name);
		var p = main.add(panel);
		main.setActiveTab(p);
    }
  }
});
