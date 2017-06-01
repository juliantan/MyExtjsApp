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
    mychart: null,
    listeners: {
    	load: function(){
    		console.log('Mirror.view.chart.TrendColumn.TrendStore loaded');
    		//tanjl: need to do redraw after this.store = Ext.create('Mirror.view.chart.TrendColumn.TrendStore') dynamically created
    		// otherwise the chart won't be displayed unless resize the browser
    		this.mychart.redraw();
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
	loadStore: function(tbl_name) {
		//tanjl: as mentioned above, we need to create another store here
		this.store = Ext.create('Mirror.view.chart.TrendColumn.TrendStore');
		this.store.mychart = this;
		this.store.getProxy().setExtraParam('tbl_name', tbl_name);
		//TODO ...
		if (tbl_name == 'tbl_hcdn_switch') {
			this.store.getProxy().setExtraParam('kpi', 'AVG(SwitchRatio)*10000');
		} else {
			this.store.getProxy().setExtraParam('kpi', 'SUM(UserCount)');
		}
		this.axes.items[0].title = this.store.proxy.extraParams.kpi;
		console.log('======================TrendColumn::loadStore:' + tbl_name + ',,,,,,,,,,,,,,,,' + this.axes.items[0].title);
		this.store.load();
	}
});
