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
				Ext.create('Mirror.view.config.ConfigPanel', {title: '帮助与配置'}),
			],
			listeners: {
				'tabchange': function() {
					Ext.getCmp('menu-panel-id').getSelectionModel().select(Ext.getCmp('menu-panel-id').getStore().getNodeById(Ext.getCmp("content-panel-id").getActiveTab().active_tree_node_id));
					Ext.ComponentMgr.get('filter-panel-id').reloadFilters();
					//Ext.ComponentMgr.get('filter-panel-id').commitForm();
				}
			}
		});
		this.callParent(arguments);
	}
})
