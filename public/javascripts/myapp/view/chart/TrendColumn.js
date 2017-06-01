Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite', 'Ext.window.MessageBox']);
Ext.require(['Ext.data.*']);

window.trendStore = Ext.create('Ext.data.JsonStore', {
    proxy: {
        type: 'ajax',
        url: 'getTrendData.do',
        extraParams: {
            tbl_name: 'tbl_hcdn_switch',
            kpi: 'AVG(SwitchRatio)*10000',
        },
        reader: {
            type: 'json',
            root: 'data'
        },
    },
    fields: [
    	{
            name: 'date',
            mapping: function(raw) {
                var result = raw.date + '';
                result = result.split('T')[0];
                return result;
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
    listeners: {
    	load: function(){
    		console.log('window.trendStore loaded');
    	}
    },
});
    
Ext.define('Mirror.view.chart.TrendColumn', {
	extend: 'Ext.chart.Chart',
	id: 'trendColumnId',
	alias : 'widget.trend-column-widget',

	style: 'background:#fff',
	animate: true,
	shadow: true,
	store: trendStore,
	axes: [{
	    type: 'Numeric',
	    position: 'left',
	    fields: ['data1'],
	    label: {
	        renderer: Ext.util.Format.numberRenderer('0.0')
	    },
	    title: trendStore.proxy.extraParams.kpi,
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
	    highlight: true,
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
	    yField: 'data1'
	}],
	loadStore: function() {
		this.store.load();
	}
});
