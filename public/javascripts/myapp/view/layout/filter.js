timeFieldsPanel = new Ext.form.FieldSet({
    id: 'timeFieldsPanelId',
    xtype:'fieldset',
    title: 'Time Filters',
    collapsible: false,
    autoHeight:true,
    defaults: {width: '100%'},
    defaultType: 'datefield',
    items: [
    	{name: 'fromDate', id: 'tfp_fromDateId', fieldLabel: 'From Date:'},
    	{name: 'toDate', id: 'tfp_toDateId', fieldLabel: 'To Date:'}
    ]
});
        
advancedFieldsPanel = new Ext.form.FieldSet({
    id: 'advancedFieldsPanelId',
    xtype:'fieldset',
    title: 'Advanced Filters',
    collapsible: false,
    autoHeight:true,
    defaults: {width: '100%'},
    defaultType: 'textfield',
    items: [
    	{ id: 'afp_platfromId', fieldLabel: 'Platform:'},
		{ xtype: 'textfield', id: 'afp_uaId', fieldLabel: 'User Agent:'},
		{ id: 'afp_hcdnVersionId', fieldLabel: 'HCDN Version:'}
	]
});

Ext.define('Demo.view.layout.filter',{
  extend: 'Ext.form.Panel',
  alias: 'widget.filter',
  initComponent : function(){
    Ext.apply(this,{
	    id: 'filter-panel',
	    title: 'Global Filters',
	    region:'east',
	    collapsible : true,
	    containerScroll : true,
	    split: true,
	    margins : '0 0 -1 1',
	    //cmargins: '3 3 3 3',
	    width : 280,
	    //minSize : 130,
	    //maxSize : 300,
		defaultType: 'textfield',
	    defaults: {
	        labelWidth: 100
	    },
	    items: [timeFieldsPanel, advancedFieldsPanel],
	    buttons: [
		    {
		        text: 'Apply',
		        id: 'fp_applyId',
		        disabled : false
		    }
		    , {
		        text: 'Reset',
		        id: 'fp_resetId',
		        disabled : false
		    }
    	]
    });
    this.callParent(arguments);
  }
})

var fd = Ext.ComponentMgr.get('tfp_toDateId');
fd.setValue(Ext.Date.clearTime(new Date()));
