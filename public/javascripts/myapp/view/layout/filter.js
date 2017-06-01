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
			value: new Date(new Date() - 3600 * 24 * 1000 * 7),
			maxValue: new Date(),
			format: 'Y-m-d',
		},
    	{
    		name: 'toDate',
			id: 'tfp_toDateId',
			fieldLabel: 'To Date:',
			value: new Date(new Date() - 3600 * 24 * 1000),
			maxValue: new Date(),
			format: 'Y-m-d',
		},
    ]
});

Ext.define('Mirror.view.layout.filter.DimStore', {
	extends: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'getDimValues.do',
        /*extraParams: {
            tbl_name: '',
            dim_name: '',
        },*/
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
    },
    fields: [
        {
            name: 'data1',
            mapping: function(raw) {
                var ids = raw.dim;
                return ids;
            }
		},
    ],
    autoLoad: false,
    listeners: {
    	load: function(){
    		console.log('window.dims loaded');
    	}
    },
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
		{
			xtype: 'combo',
			id: 'afp_hcdnVersionId',
			fieldLabel: 'HCDN Version:',
			store: Ext.create('Mirror.view.layout.filter.DimStore', {}),
			queryMode: 'local',
			displayField: 'data1',
			valueField: 'data1',
			value: 'All',
			loadData: function() {
				this.store.getProxy().setExtraParam("tbl_name", "tbl_hcdn_switch");
				this.store.getProxy().setExtraParam("dim_name", "HcdnVersion");
				this.store.load();
			}
		},
		{
			xtype: 'combo',
			id: 'afp_uaId',
			fieldLabel: 'User Agent:',
			store: Ext.create('Mirror.view.layout.filter.DimStore', {}),
			queryMode: 'local',
			displayField: 'data1',
			valueField: 'data1',
			value: 'All',
			loadData: function() {
				this.store.getProxy().setExtraParam("tbl_name", "tbl_hcdn_switch");
				this.store.getProxy().setExtraParam("dim_name", "UA");
				this.store.load();
			}
		},
	],
	loadData: function() {
		Ext.ComponentMgr.get('afp_hcdnVersionId').loadData();
		Ext.ComponentMgr.get('afp_uaId').loadData();
	}
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
    	loadData: function() {
    		Ext.ComponentMgr.get('advancedFieldsPanelId').loadData();
    	}
    });
    this.callParent(arguments);
    this.loadData();
  }
});
