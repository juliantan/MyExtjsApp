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
    		this.ownerCmp.redraw();
    	}
    },
});


    window.generateData2 = function(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 20 : floor;
        
        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };

window.store_top = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateData2()
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
        fields: ['name'],
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
            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1'));
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
        xField: 'name',
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