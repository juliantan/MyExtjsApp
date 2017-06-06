Ext.define('Mirror.view.chart.TopDimension.TopNStore', {
	extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'getTopNData.do',
        reader: {
            type: 'json',
            root: 'data'
        },
    },
    fields: [
    	{
            name: 'full_name',
            mapping: function(raw) {
				return raw.dm;
	        }
        },
    	{
            name: 'short_name',
            mapping: function(raw) {
            	if (raw.dm != null && raw.dm.length >= 20) {
                	return raw.dm.slice(0,20) + '...';
                } else {
                	return raw.dm;
                }
	        }
        },
        {
            name: 'data1',
            mapping: function(raw) {
                return raw.m1;
            }
		},
    ],
    autoLoad: false,
    ownerCmp: null,
    listeners: {
    	load: function(){
    		this.ownerCmp.redraw();
    	}
    },
});

Ext.define('Mirror.view.chart.TopDimension', {
	extend: 'Ext.chart.Chart',
	id: 'topDimensionId',
	alias : 'widget.top-dimension-widget',
	border: true,
    animate: true,
    shadow: true,
    store: Ext.create('Mirror.view.chart.TopDimension.TopNStore'),
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['data1'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,000.0')
        },
        title: '',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'left',
        fields: ['short_name'],
        title: ''
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
			trackMouse: true,
			width: 140,
			height: 28,
			renderer: function(storeItem, item) {
				var tipTitle = storeItem.get('full_name') + ': ' + storeItem.get('data1');
		        this.width = tipTitle.length * 8;
		        this.setTitle(tipTitle);
			}
        },
        label: {
          display: 'insideEnd',
            field: 'data1',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
          'text-anchor': 'middle'
        },
        xField: 'full_name',
        yField: ['data1']
    }],
	loadStore: function(params) {
		var me = this;
		me.store = Ext.create('Mirror.view.chart.TopDimension.TopNStore');
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
		if (params['dimension_name'] != 'None') {
			me.store.getProxy().setExtraParam('dimension_name', params['dimension_name']);
		}
		me.axes.items[0].title = params['top_date'] + ': ' + params['kpi_name'] + ((params['kpi_unit'] != null && params['kpi_unit'] != '') ? '(' + params['kpi_unit'] + ')' : '');
		me.axes.items[1].title = params['dimension_name'] + '(Top-' + params['top_n'] + ')';
		me.store.load();
	},
	listeners: {
		afterrender: function() {
		},
	},
});