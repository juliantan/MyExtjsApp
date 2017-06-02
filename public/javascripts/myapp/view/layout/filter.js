function getActiveTblName()
{
	if (Ext.getCmp("content-panel-id") != null && Ext.getCmp("content-panel-id").getActiveTab() != null) {
		return Ext.getCmp("content-panel-id").getActiveTab().tbl_name;
	}
}

Ext.define('Mirror.view.layout.filter.TimeFieldSet', {
	extend: 'Ext.form.FieldSet',
	xtype: 'x_time_fs',
    title: '日期',
    autoHeight:true,
    defaults: {width: '100%'},
    defaultType: 'datefield',
    collapsible: true,
    collapsed: false,
    items: [
    	{
    		name: 'fromDate',
			//id: 'tfp_fromDateId',
			fieldLabel: 'From Date:',
			value: new Date(new Date() - 3600 * 24 * 1000 * 7),
			maxValue: new Date(),
			format: 'Y-m-d',
		},
    	{
    		name: 'toDate',
			//id: 'tfp_toDateId',
			fieldLabel: 'To Date:',
			value: new Date(new Date() - 3600 * 24 * 1000),
			maxValue: new Date(),
			format: 'Y-m-d',
		},
    ]
});

Ext.define('Mirror.view.layout.filter.FixedDimStore', {
	extend: 'Ext.data.Store',
	xtype: 'x_fixed_dim_store',
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
    		console.log('FixedDimStore loaded');
    	}
    },
});

Ext.define('Mirror.view.layout.filter.KpiStore', {
	extend: 'Ext.data.Store',
	xtype: 'x_kpi_store',
    proxy: {
        type: 'ajax',
        url: 'getKpis.do',
        /*extraParams: {
            tbl_name: '',
        },*/
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
    },
    fields: [
        {
            name: 'name',
            mapping: function(raw) {
                var ids = raw.KpiName;
                return ids;
            }
		},
        {
            name: 'value',
            mapping: function(raw) {
                var values = raw.KpiName;
                return values;
            }
		},
    ],
    autoLoad: false,
    ownerCmp: null,
    listeners: {
    	load: function(){
    		console.log('kpiStore loaded');
    		if (this.ownerCmp != null && this.ownerCmp.store.getCount() > 0) {
    			this.ownerCmp.setValue(this.ownerCmp.store.getAt(0).data.value);
    		}
    	}
    },
});

Ext.define('Mirror.view.layout.filter.AdvancedFilterFieldSet', {
	extend: 'Ext.form.FieldSet',
    xtype: 'x_advanced_filter_fs',
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
			cls: 'afp_kpi_combo',
			//id: 'afp_kpiId',
			fieldLabel: 'KPI:',
			store: Ext.create('Mirror.view.layout.filter.KpiStore', {}),
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			value: '',
			loadData: function(tbl_name) {
				this.store.ownerCmp = this;
				this.store.getProxy().setExtraParam("tbl_name", tbl_name);
				this.store.load();
			}
		},
		{
			xtype: 'combo',
			cls: 'afp_hcdnv_combo',
			//id: 'afp_hcdnVersionId',
			fieldLabel: 'HCDN Version:',
			store: Ext.create('Mirror.view.layout.filter.FixedDimStore', {}),
			queryMode: 'local',
			displayField: 'data1',
			valueField: 'data1',
			value: 'All',
			loadData: function(tbl_name) {
				this.store.getProxy().setExtraParam("tbl_name", tbl_name);
				this.store.getProxy().setExtraParam("dim_name", "HcdnVersion");
				this.store.load();
			}
		},
		{
			xtype: 'combo',
			cls: 'afp_uaid_combo',
			//id: 'afp_uaId',
			fieldLabel: 'User Agent:',
			store: Ext.create('Mirror.view.layout.filter.FixedDimStore', {}),
			queryMode: 'local',
			displayField: 'data1',
			valueField: 'data1',
			value: 'All',
			loadData: function(tbl_name) {
				this.store.getProxy().setExtraParam("tbl_name", tbl_name);
				this.store.getProxy().setExtraParam("dim_name", "UA");
				this.store.load();
			}
		},
	],
	loadData: function(tbl_name) {
		Ext.ComponentQuery.query('combo[cls=afp_kpi_combo]')[0].loadData(tbl_name);
		Ext.ComponentQuery.query('combo[cls=afp_hcdnv_combo]')[0].loadData(tbl_name);
		Ext.ComponentQuery.query('combo[cls=afp_uaid_combo]')[0].loadData(tbl_name);
	}
});

Ext.define('Mirror.view.layout.filter.DimStore', {
	extend: 'Ext.data.Store',
	xtype: 'x_dim_store',
    /* fields: ['name', 'value'],
    data : [
        {name: "HCDN版本号", value: 'HcdnVersion'},
        {name: "User Agent", value: 'UA'},
    ], */
    proxy: {
        type: 'ajax',
        url: 'getDimensions.do',
        /*extraParams: {
            tbl_name: '',
        },*/
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
    },
    fields: [
        {
            name: 'name',
            mapping: function(raw) {
                var ids = raw.dim;
                return ids;
            }
		},
        {
            name: 'value',
            mapping: function(raw) {
                var ids = raw.dim;
                return ids;
            }
		},
    ],
    autoLoad: false,
    listeners: {
    	load: function(){
    		console.log('DimStore loaded');
    	}
    },
});

Ext.define('Mirror.view.layout.filter.DimensionFieldSet', {
	extend: 'Ext.form.FieldSet',
	xtype: 'x_dimension_fs',
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
			fieldLabel: 'Dimension:',
			store: Ext.create('Mirror.view.layout.filter.DimStore', {}),
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			value: 'None',
			loadData: function(tbl_name) {
				this.store.getProxy().setExtraParam('tbl_name', tbl_name);
				this.store.load();
			}
		},
	],
	loadData: function(tbl_name) {
		this.down('combo').loadData(tbl_name);
	}
});

Ext.define('Mirror.view.layout.filter',{
  extend: 'Ext.form.Panel',
  alias: 'widget.filter',
  xtype: 'x_filter',
  initComponent : function(){
    Ext.apply(this,{
	    //id: 'filter-panel-id',
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
	    buttons: [
	    	{
	    		text: 'Add Filter',
	    		dynamicFilterCnt: 0,
	    		handler: function() {
	    			this.dynamicFilterCnt++;
	    			dynamicFilterCnt = this.dynamicFilterCnt;
	    			this.up().up().down('x_advanced_filter_fs').add(
	    				{
	    					xtype: 'panel',
	    					layout: 'hbox',
	    					border: false,
	    					items: [
								{
									xtype: 'combo',
									id: 'afp_dimComboId' + dynamicFilterCnt,
									store: Ext.create('Mirror.view.layout.filter.DimStore', {}),
									queryMode: 'local',
									displayField: 'name',
									valueField: 'value',
									//value: 'None',
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
	    			Ext.ComponentMgr.get('afp_dimComboId' + dynamicFilterCnt).store.getProxy().setExtraParam('tbl_name', this.up('panel').tbl_name);
	    			Ext.ComponentMgr.get('afp_dimComboId' + dynamicFilterCnt).store.load();
	    		},
	    	},
		    {
		        text: 'Apply',
		        id: 'fp_applyId',
		        disabled : false,
		        handler: function() {
		        	this.up().up().commitForm();
		        }
		    },
		    {
		        text: 'Reset',
		        id: 'fp_resetId',
		        disabled : false,
		        handler: function() {
		        	var me = this.up().up();
		        	me.reloadFilters();
		        }
		    },
		    {
		        text: 'Test',
		        id: 'fp_testId',
		        disabled : false,
		        handler: function() {
		        	var me = this.up().up();
		        	me.removeAll();
		        	me.doLayout();
		        }
		    }
    	],
    	tbl_name: '',
    	loadData: function(tbl_name) {
    		console.log('LLLLLLLLLLLLLLLLLLLL filter::loadData tbl_name: ' + tbl_name);
    		this.resetAll();
    		this.tbl_name = tbl_name;
    		console.log('filter-panel-id.tbl_name: ' + this.tbl_name);
    		debugger;
    		this.down('x_advanced_filter_fs').loadData(tbl_name);
    		this.down('x_dimension_fs').loadData(tbl_name);
    		//this.commitForm();
    	},
    	resetAll: function() {
    		console.log('FilterPanel::resetAll()');
    		//this.tbl_name = '';
    		//this.loadData('');
    		//TODO ... reset all the fields
    	},
    	commitForm: function() {
    		if (Ext.getCmp("content-panel-id").getActiveTab().down('trend-column-widget') != null) {
    			Ext.getCmp("content-panel-id").getActiveTab().down('trend-column-widget').loadStore(tbl_name);
    		} else {
    			Ext.MessageBox.alert('Error', 'No report selected!');
    		}
    	},
    	reloadFilters: function() {
    		debugger;
    		var me = this;
    		//me.items.removeAll();
        	me.items.add(Ext.create('Mirror.view.layout.filter.TimeFieldSet', {}));
        	me.items.add(Ext.create('Mirror.view.layout.filter.AdvancedFilterFieldSet', {}));
        	me.items.add(Ext.create('Mirror.view.layout.filter.DimensionFieldSet', {}));
        	me.doLayout();
    	},
    	
    });
    this.callParent(arguments);
    debugger;
    this.reloadFilters();
    //this.loadData('');
  }
});
