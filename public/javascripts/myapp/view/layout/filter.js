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
    autoHeight: true,
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
                var values = raw.Formula + ';' + (raw.KpiUnit != null ? raw.KpiUnit : '') + ';' + (raw.KpiDataFormat != null ? raw.KpiDataFormat : '');
                return values;
            }
		},
    ],
    autoLoad: false,
    ownerCmp: null,
    listeners: {
    	load: function(){
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
			loadData: function() {
				this.store.ownerCmp = this;
				this.store.getProxy().setExtraParam("tbl_name", getActiveTblName());
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
			loadData: function() {
				this.store.getProxy().setExtraParam("tbl_name", getActiveTblName());
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
			loadData: function() {
				this.store.getProxy().setExtraParam("tbl_name", getActiveTblName());
				this.store.getProxy().setExtraParam("dim_name", "UA");
				this.store.load();
			}
		},
		{
			xtype: 'panel',
			cls: 'cls_dynamic_filter_cond_relation',
			layout: 'hbox',
			border: false,
			items: [
		    	{
		    		flex: 1,
		    		xtype: 'radiofield',
		    		boxLabel: 'AND',
		    		name: 'dynamic_filter_cond_relation',
		    		inputValue: 'AND',
		    		checked: true,
		    	},
		    	{
		    		flex: 1,
		    		xtype: 'radiofield',
		    		boxLabel: 'OR',
		    		name: 'dynamic_filter_cond_relation',
		    		inputValue: 'OR',
		    	},
		    ],
		},
	],
	loadData: function() {
		Ext.ComponentQuery.query('combo[cls=afp_kpi_combo]')[0].loadData();
		Ext.ComponentQuery.query('combo[cls=afp_hcdnv_combo]')[0].loadData();
		Ext.ComponentQuery.query('combo[cls=afp_uaid_combo]')[0].loadData();
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
    	}
    },
});

Ext.define('Mirror.view.layout.filter.DimAndMeasStore', {
	extend: 'Ext.data.Store',
	xtype: 'x_dim_meas_store',
    /* fields: ['name', 'value'],
    data : [
        {name: "HCDN版本号", value: 'HcdnVersion'},
        {name: "User Agent", value: 'UA'},
    ], */
    proxy: {
        type: 'ajax',
        url: 'getDimensionAndMeasures.do',
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
                var ids = raw.col;
                return ids;
            }
		},
        {
            name: 'value',
            mapping: function(raw) {
                var ids = raw.col;
                return ids;
            }
		},
    ],
    autoLoad: false,
    listeners: {
    	load: function(){
    	}
    },
});

Ext.define('Mirror.view.layout.filter.DimensionFieldSet', {
	extend: 'Ext.form.FieldSet',
	xtype: 'x_dimension_fs',
    title: '维度',
    collapsible: true,
    collapsed: false,
    checkboxToggle: false,
    autoHeight:true,
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
			loadData: function() {
				this.store.getProxy().setExtraParam('tbl_name', getActiveTblName());
				this.store.load();
			}
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Top:',
			value: '5',
		},
		{
			xtype: 'fieldcontainer',
			fieldLabel: 'Order',
			defaultType: 'radiofield',
			defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
            	{
            		boxLabel: 'DESC',
            		name: 'order',
            		inputValue: 'DESC',
            		checked: true,
            	},
            	{
            		boxLabel: 'ASC',
            		name: 'order',
            		inputValue: 'ASC',
            	},
            ],
		},
	],
	loadData: function() {
		this.down('combo').loadData();
	}
});

Ext.define('Mirror.view.layout.filter.KpiLevelFilterFieldSet', {
	extend: 'Ext.form.FieldSet',
	xtype: 'x_kpi_level_filter_fs',
    title: 'KPI级过滤',
    collapsible: true,
    collapsed: false,
    checkboxToggle: true,
    autoHeight:true,
    defaults: {width: '100%'},
    layout: 'hbox',
    defaultType: 'textfield',
    items: [
		{
			xtype: 'combo',
			flex: 1,
			store: Ext.create('Mirror.view.layout.filter.KpiStore', {}),
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			value: 'None',
			loadData: function() {
				this.store.getProxy().setExtraParam('tbl_name', getActiveTblName());
				this.store.load();
			}
		},
		{
			xtype: 'combo',
			flex: 1,
			store: {
				fields: ['op_name'],
				data: [
					{'op_name': '='},
					{'op_name': '>'},
					{'op_name': '>='},
					{'op_name': '<'},
					{'op_name': '<='},
				],
			},
			queryMode: 'local',
			displayField: 'op_name',
			valueField: 'op_name',
			value: '=',
		},
		{
			xtype: 'textfield',
			flex: 1,
			fieldLabel: '',
			value: '',
		},
	],
	loadData: function() {
		this.down('combo').loadData();
	}
});

Ext.define('Mirror.view.layout.filter',{
  extend: 'Ext.form.Panel',
  alias: 'widget.filter-widget',
  xtype: 'x_filter',
  initComponent : function(){
    Ext.apply(this,{
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
	    					cls: "dynamic_filter",
	    					layout: 'hbox',
	    					border: false,
	    					items: [
								{
									xtype: 'combo',
									id: 'afp_dimComboId' + dynamicFilterCnt,
									store: Ext.create('Mirror.view.layout.filter.DimAndMeasStore', {}),
									queryMode: 'local',
									displayField: 'name',
									valueField: 'value',
									//value: 'None',
									flex: 1,
								},
								{
									xtype: 'combo',
									id: 'afp_opComboId' + dynamicFilterCnt,
									store: {
										fields: ['op_name'],
										data: [
											{'op_name': '='},
											{'op_name': 'IN'},
											{'op_name': '>'},
											{'op_name': '>='},
											{'op_name': '<'},
											{'op_name': '<='},
											{'op_name': 'LIKE'},
										],
									},
									queryMode: 'local',
									displayField: 'op_name',
									valueField: 'op_name',
									value: '=',
									flex: 1,
								},
								{xtype: 'textfield', flex: 1},
								{xtype: 'checkbox', flex: 0.5, name: 'df_revert', boxLabel: '!', checked: false},
								{
									xtype: 'button',
									icon: 'images/del.ico',
									flex: 0,
									handler: function() {
										this.up('panel').up().remove(this.up('panel'));
										Ext.getCmp('desk').down('x_filter').layoutDynamicFilterRelation();
									},
								},
							],
	    				},
	    			);
	    			Ext.ComponentMgr.get('afp_dimComboId' + dynamicFilterCnt).store.getProxy().setExtraParam('tbl_name', getActiveTblName());
	    			Ext.ComponentMgr.get('afp_dimComboId' + dynamicFilterCnt).store.load();
	    			this.up().up().layoutDynamicFilterRelation();
	    		},
	    	},
		    {
		        text: 'Apply',
		        id: 'fp_applyId',
		        disabled : false,
		        handler: function() {
		        	var filter_panel = this.up().up();
		        	filter_panel.resetChart();
		        	filter_panel.commitForm();
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
    	],
    	layoutDynamicFilterRelation: function() {
			var dynamic_filters = Ext.ComponentQuery.query('panel[cls=dynamic_filter]');
			if (dynamic_filters.length > 0) {
				Ext.ComponentQuery.query('panel[cls=cls_dynamic_filter_cond_relation]')[0].setVisible(true);
			} else {
				Ext.ComponentQuery.query('panel[cls=cls_dynamic_filter_cond_relation]')[0].setVisible(false);
			}
    	},
		listeners: {
			resize: function() {
				this.layoutDynamicFilterRelation();
				this.doLayout();
			},
		},
    	loadData: function() {
    		this.resetAll();
    		this.down('x_advanced_filter_fs').loadData();
    		this.down('x_dimension_fs').loadData();
    		this.down('x_kpi_level_filter_fs').loadData();
    	},
    	resetAll: function() {
    		//this.loadData('');
    		//TODO ... reset all the fields
    	},
    	resetTrendChart: function() {
    		/*var myobj = Ext.getCmp("content-panel-id").getActiveTab().down('trend-column-widget');
    		if (myobj != null) {
    			myobj.clearChart();
    		}*/
    		var myPanel = Ext.getCmp("content-panel-id").getActiveTab().down('panel');
    		if (myPanel != null && myPanel.down('trend-column-widget') != null) {
	    		myPanel.removeAll();
	    		myPanel.add(Ext.create('Mirror.view.chart.TrendColumn', {anchor: '100% 100%',}));
	    		myPanel.doLayout();
		    }
    	},
    	resetTopNChart: function() {
    		var myPanel = Ext.getCmp("content-panel-id").getActiveTab().down('panel');
    		if (myPanel != null) {
	    		var topNPanel = myPanel.next();
	    		if (topNPanel != null && topNPanel.down('top-dimension-widget') != null) {
		    		topNPanel.removeAll();
		    		topNPanel.add(Ext.create('Mirror.view.chart.TopDimension', {anchor: '50% 100%',}));
		    		topNPanel.add(Ext.create('Mirror.view.chart.PieChart', {anchor: '50% 100%',}));
		    		topNPanel.doLayout();
		    	}
		    }
    	},
    	resetChart: function() {
    		this.resetTrendChart();
    		this.resetTopNChart();
    	},
    	commitForm: function(optParams) {
    		if (Ext.getCmp("content-panel-id").getActiveTab().down('trend-column-widget') != null) {
    			var params = {
    				tbl_name: getActiveTblName(),
    				from_date: this.down('x_time_fs').items.items[0].getValue().toLocaleDateString(),
    				to_date: this.down('x_time_fs').items.items[1].getValue().toLocaleDateString(),
    				kpi_name: Ext.ComponentQuery.query('combo[cls=afp_kpi_combo]')[0].getDisplayValue(),
    				kpi_formula: Ext.ComponentQuery.query('combo[cls=afp_kpi_combo]')[0].getValue().split(';')[0],
    				kpi_unit: Ext.ComponentQuery.query('combo[cls=afp_kpi_combo]')[0].getValue().split(';')[1],
    				kpi_data_format: Ext.ComponentQuery.query('combo[cls=afp_kpi_combo]')[0].getValue().split(';')[2],
    				hcdn_version: Ext.ComponentQuery.query('combo[cls=afp_hcdnv_combo]')[0].getValue(),
    				ua: Ext.ComponentQuery.query('combo[cls=afp_uaid_combo]')[0].getValue(),
    			};
    			var dynamic_filters = Ext.ComponentQuery.query('panel[cls=dynamic_filter]');
    			params.dynamic_filter_cnt = dynamic_filters.length;
    			var dfcrPanel = Ext.ComponentQuery.query('panel[cls=cls_dynamic_filter_cond_relation]')[0];
    			if (dfcrPanel.down().getValue() == true) {
    				params.dynamic_filter_relation = 'AND';
    			} else {
    				params.dynamic_filter_relation = 'OR';
    			}
    			var i = 0;
    			for (i = 0; i < dynamic_filters.length; i++) {
    				params['dynamic_filter_name' + i] = dynamic_filters[i].down('combo').getValue();
    				params['dynamic_filter_op' + i] = dynamic_filters[i].down('combo').next().getValue();
    				params['dynamic_filter_value' + i] = dynamic_filters[i].down('combo').next().next().getValue();
    				params['dynamic_filter_revert' + i] = dynamic_filters[i].down('combo').next().next().next().getValue();
    			}
    			params.dimension_name = this.down('x_dimension_fs').down('combo').getValue();
    			Ext.getCmp("content-panel-id").getActiveTab().down('trend-column-widget').loadStore(params);
    			params.top_n = this.down('x_dimension_fs').down('combo').next().getValue();
    			if (optParams != null && optParams['top_date'] != null) {
    				params.top_date = optParams['top_date'];
	    			var descRadio = this.down('x_dimension_fs').down('combo').next().next().down('radiofield');
	    			params.order = descRadio.checked ? 'DESC' : 'ASC';
	    			Ext.getCmp("content-panel-id").getActiveTab().down('top-dimension-widget').loadStore(params);
	    			Ext.getCmp("content-panel-id").getActiveTab().down('pie-chart-widget').loadStore(params);
    			} else {
    				this.resetTopNChart();
    			}
    		} else {
    			Ext.MessageBox.alert('Error', 'No report selected!');
    		}
    	},
    	reloadFilters: function() {
    		var me = this;
    		me.removeAll();
        	me.items.add(Ext.create('Mirror.view.layout.filter.TimeFieldSet', {}));
        	me.items.add(Ext.create('Mirror.view.layout.filter.AdvancedFilterFieldSet', {}));
        	me.items.add(Ext.create('Mirror.view.layout.filter.DimensionFieldSet', {}));
        	me.items.add(Ext.create('Mirror.view.layout.filter.KpiLevelFilterFieldSet', {}));
        	me.doLayout();
        	me.loadData();
        	me.layoutDynamicFilterRelation();
    	},
    });
    this.callParent(arguments);
    this.reloadFilters(getActiveTblName());
  }
});
