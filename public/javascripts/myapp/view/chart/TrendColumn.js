Ext.define('Mirror.view.chart.TrendColumn.TrendStore', {
	extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'getTrendData.do',
        /*extraParams: {
            tbl_name: '',
            kpi: '',
        },*/
        reader: {
            type: 'json',
            root: 'data'
        },
    },
    fields: [
    	{
            name: 'date',
            mapping: function(raw) {
                var result = new Date(raw.date + '');
                return result.toLocaleDateString();
	        }
        },
        {
            name: 'data1',
            mapping: function(raw) {
                var ids = raw.m1;
                return ids;
            }
		},
    ],
    autoLoad: false,
    ownerCmp: null,
    listeners: {
    	load: function(){
    		//tanjl: need to do redraw after this.store = Ext.create('Mirror.view.chart.TrendColumn.TrendStore') dynamically created
    		// otherwise the chart won't be displayed unless resize the browser
    		this.ownerCmp.redraw();
    	}
    },
});

Ext.define('Mirror.view.chart.TrendColumn', {
	extend: 'Ext.chart.Chart',
	//id: 'trendColumnId',
	alias : 'widget.trend-column-widget',

	style: 'background:#fff',
	animate: true,
	shadow: true,
	//tanjl: Cannot just use following way, all the TrendColumn objects will share the same store object if just following way applied
	// we need to create another store when loaded
	store: Ext.create('Mirror.view.chart.TrendColumn.TrendStore'),
	axes: [{
	    type: 'Numeric',
	    position: 'left',
	    fields: ['data1'],
	    label: {
	        renderer: Ext.util.Format.numberRenderer('0.0')
	    },
	    title: '',
	    grid: true,
	    minimum: 0
	}, {
	    type: 'Category',
	    position: 'bottom',
	    fields: ['date'],
	    //title: 'Date'
	}],
	series: [{
	    type: 'column',
	    axis: 'left',
	    //highlight: true,
        highlightCfg: {
            fill: '#a2b5ca'
        },
	    tips: {
	      trackMouse: true,
	      width: 140,
	      height: 28,
	      renderer: function(storeItem, item) {
	        var tipTitle = storeItem.get('date') + ': ' + storeItem.get('data1');
	        this.width = tipTitle.length * 7;
	        this.setTitle(tipTitle);
	      }
	    },
	    label: {
	      display: 'insideEnd',
	      'text-anchor': 'middle',
	        field: 'data1',
	        renderer: Ext.util.Format.numberRenderer('0'),
	        orientation: 'vertical',
	        color: '#333'
	    },
	    xField: 'date',
	    yField: 'data1',
	    myHighlightItem: null,
		listeners: {
		    itemclick: function (param) {
		    	var myseries = this;
		        console.log(param.storeItem.get(myseries.xField) + ':' + param.storeItem.get(param.yField));
                myseries.highlight = true;
                var top_date = null;
	            for (var i = 0, items = myseries.items, l = items.length; i < l; i++) {
	                if (items[i].storeItem.get(myseries.xField) == param.storeItem.get(myseries.xField)) {
			            myseries.unHighlightItem();
            			myseries.cleanHighlights();
	                	if (myseries.myHighlightItem != items[i]) {
		                    myseries.highlightItem(items[i]);
		                    myseries.myHighlightItem = items[i];
		                    top_date = items[i].storeItem.get(myseries.xField);
	                    } else {
	            			myseries.myHighlightItem = null;
	                    }
	                    break;
	                }
	            }
	            myseries.highlight = false;
	            Ext.getCmp("content-panel-id").up().down('x_filter').commitForm({top_date: top_date});
		    }
		}
	}],
	cleanMyHighlights: function() {
		var myseries = this.series.get(0);
    	myseries.highlight = true;
        myseries.unHighlightItem();
		myseries.cleanHighlights();
		myseries.highlight = false;
		myseries.myHighlightItem = null;
	},
	loadStore: function(params) {
		//tanjl: as mentioned above, we need to create another store here
		var me = this;
		me.store = Ext.create('Mirror.view.chart.TrendColumn.TrendStore');
		me.store.ownerCmp = me;
		me.store.getProxy().extraParams = {};
		Object.keys(params).forEach(function(key) {
		     me.store.getProxy().extraParams[key] = params[ key ];
		});
		if (params['hcdn_version'] == 'All') {
			delete me.store.getProxy().extraParams['hcdn_version'];
		}
		if (params['ua'] == 'All') {
			delete me.store.getProxy().extraParams['ua'];
		}
		delete me.store.getProxy().extraParams['dimension_name'];
		/*if (params['dimension_name'] != 'None') {
			me.store.getProxy().setExtraParam('dimension_name', params['dimension_name']);
		}*/
		me.axes.items[0].title = params['kpi_name'] + ((params['kpi_unit'] != null && params['kpi_unit'] != '') ? '(' + params['kpi_unit'] + ')' : '');
		me.store.load();
	}
});
