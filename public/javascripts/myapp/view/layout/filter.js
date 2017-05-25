timeFieldsPanel = new Ext.form.FieldSet({
    id: 'timeFieldsPanelId',
    xtype:'fieldset',
    title: 'Time Filters',
    collapsible: false,
    autoHeight:true,
    defaults: {width: '100%'},
    defaultType: 'datefield',
    collapsible: true,
    items: [
    	{
    		name: 'fromDate',
			id: 'tfp_fromDateId',
			fieldLabel: 'From Date:',
			value: new Date(new Date() - 3600 * 24 * 1000),
			maxValue: new Date(),
			format: 'Y-m-d',
		},
    	{
    		name: 'toDate',
			id: 'tfp_toDateId',
			fieldLabel: 'To Date:',
			value: new Date(),
			maxValue: new Date(),
			format: 'Y-m-d',
		},
    ]
});

var uas = Ext.create('Ext.data.Store', {
    fields: ['name'],
    data : [
        {"name":"ua1"},
        {"name":"ua2"},
    ]
});

advancedFieldsPanel = new Ext.form.FieldSet({
    id: 'advancedFieldsPanelId',
    xtype:'fieldset',
    title: 'Advanced Filters',
    collapsible: false,
    autoHeight:true,
    collapsed: false,
    checkboxToggle: true,
    defaults: {width: '100%'},
    defaultType: 'textfield',
    items: [
    	{ id: 'afp_platfromId', fieldLabel: 'Platform:', value: 'All', },
		{ id: 'afp_hcdnVersionId', fieldLabel: 'HCDN Version:', value: 'All', },
		{
			xtype: 'combo',
			id: 'afp_uaId',
			fieldLabel: 'User Agent:',
			store: uas,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'name',
			value: 'All',
		},
	],
    onAddNewField : function(btn){
    alert('hi');
        var form = btn.up(); // this is a better approach
        form.add({xtype:'textfield', fieldLabel:"First Name"});
    }
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
	    autoScroll: true,
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
	    		text: 'Add Filter',
	    		handler: function() {
	    			Ext.ComponentMgr.get('advancedFieldsPanelId').add({xtype:'textfield', fieldLabel:"First Name"});
	    		},
	    	},
		    {
		        text: 'Apply',
		        id: 'fp_applyId',
		        disabled : false
		    },
		    {
		        text: 'Reset',
		        id: 'fp_resetId',
		        disabled : false
		    }
    	]
    });
    this.callParent(arguments);
  }
});
