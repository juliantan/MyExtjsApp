Ext.define('Mirror.view.layout.tabPanel',{
  extend: 'Ext.tab.Panel',
  alias: 'widget.tabPanel',
  initComponent : function(){
    Ext.apply(this,{
      id: 'content-panel',
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
	        title: '首页',
	        //iconCls:'home',
	        layout: 'fit'
		}
      ]
    });
    this.callParent(arguments);
  }
})
