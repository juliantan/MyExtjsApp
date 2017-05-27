timeFieldsPanel = new Ext.form.FieldSet({
    id: 'timeFieldsPanelId',
    xtype:'fieldset',
    title: '日期',
    autoHeight:true,
    defaults: {width: '100%'},
    defaultType: 'datefield',
    collapsible: true,
    collapsed: false,
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

var measureStore = Ext.create('Ext.data.Store', {
    fields: ['name', 'value'],
    data : [
    	{name: "None",  value: 'None'},
        {name: "总任务数", value: 'TotalTaskCnt'},
        {name: "切换任务数", value: 'SwitchedTaskCnt'},
        {name: "切换率", value: 'SwitchRatio'},
    ]
});

advancedFieldsPanel = new Ext.form.FieldSet({
    id: 'advancedFieldsPanelId',
    xtype:'fieldset',
    title: '过滤',
    collapsible: true,
    collapsed: false,
    autoHeight:true,
    //checkboxToggle: true,
    defaults: {width: '100%'},
    defaultType: 'textfield',
    items: [
		{
			xtype: 'combo',
			id: 'afp_kpiId',
			fieldLabel: 'KPI:',
			store: measureStore,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			value: 'None',
		},
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
});

var dimensionStore = Ext.create('Ext.data.Store', {
    fields: ['name', 'value'],
    data : [
    	{name: "None",  value: 'None'},
        {name: "HCDN版本号", value: 'HcdnVersion'},
        {name: "User Agent", value: 'UA'},
    ]
});

dimensionPanel = Ext.create('Ext.form.FieldSet', {
    id: 'dimensionPanelId',
    title: '维度',
    collapsible: true,
    collapsed: false,
    autoHeight:true,
    checkboxToggle: true,
    defaults: {width: '100%'},
    defaultType: 'textfield',
    items: [
		{
			xtype: 'combo',
			id: 'dp_dimensionId',
			fieldLabel: 'Dimension:',
			store: dimensionStore,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			value: 'None',
		},
	],
});

var keyStore = Ext.create('Ext.data.Store', {
    fields: ['name', 'value'],
    data : [
        {name: "HCDN版本号", value: 'HcdnVersion'},
        {name: "User Agent", value: 'UA'},
    ]
});

Ext.define('Mirror.view.layout.filter',{
  extend: 'Ext.form.Panel',
  alias: 'widget.filter',
  initComponent : function(){
    Ext.apply(this,{
	    id: 'filter-panel',
	    title: '图表参数',
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
	    items: [timeFieldsPanel, advancedFieldsPanel, dimensionPanel],
	    buttons: [
	    	{
	    		text: 'Add Filter',
	    		handler: function() {
	    			Ext.ComponentMgr.get('advancedFieldsPanelId').add(
	    				{
	    					xtype: 'panel',
	    					layout: 'hbox',
	    					border: false,
	    					items: [
								{
									xtype: 'combo',
									store: keyStore,
									queryMode: 'local',
									displayField: 'name',
									valueField: 'value',
									value: 'None',
									flex: 1,
								},
								{xtype: 'textfield', flex: 1},
								{
									xtype: 'button',
									icon: 'images/del.ico',
									flex: 0,
									handler: function() {
										this.up('panel').up().remove(this.up('panel'));
									},
								},
							],
	    				},
	    			);
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
    	],
    });
    this.callParent(arguments);
  }
});
