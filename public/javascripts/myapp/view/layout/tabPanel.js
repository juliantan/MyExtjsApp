Ext.define('Mirror.view.layout.tabPanel',{
	extend: 'Ext.tab.Panel',
	alias: 'widget.tabPanel',
	initComponent : function(){
		Ext.apply(this,{
			//id: 'content-panel-id',
			region: 'center',
			defaults: {
				autoScroll:true,
				bodyPadding: 10
			},
			activeTab: 0,
			border: false,
			//plain: true,
			items: [
				{
					id: 'HomePage',
					title: '使用帮助',
					//iconCls:'home',
					layout: 'fit'
				}
			],
			listeners: {
				'tabchange': function() {
					Ext.ComponentMgr.get('filter-panel-id').reloadFilters();
					//Ext.ComponentMgr.get('filter-panel-id').commitForm();
				}
			}
		});
		this.callParent(arguments);
	}
})
