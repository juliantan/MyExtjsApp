Ext.define('Mirror.view.chart.PieChart.PieStore', {
	extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'getPieData.do',
        reader: {
            type: 'json',
            root: 'data'
        },
    },
    fields: [
    	{
            name: 'full_name',
            mapping: function(raw) {
				var fname = raw.dm;
            	if (raw.total != null) {
	            	var d = (raw.m1 / raw.total) * 100;
	            	var pct = d.toFixed(1) + '%';
	                return pct + ': ' + fname;
				} else {
					return fname;
				}
	        }
        },
    	{
            name: 'short_name',
            mapping: function(raw) {
            	var sname = '';
            	if (raw.dm != null && raw.dm.length >= 20) {
                	sname = raw.dm.slice(0, 15) + '...';
                } else {
                	sname = raw.dm;
                }
            	if (raw.total != null) {
	            	var d = (raw.m1 / raw.total) * 100;
	            	var pct = d.toFixed(1) + '%';
	                return pct + ': ' + sname;
				} else {
					return sname;
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
    		if (this.ownerCmp) {
    			this.ownerCmp.redraw();
    		}
    	}
    },
});

Ext.define('Mirror.view.chart.PieChart', {
	extend: 'Ext.chart.Chart',
	alias : 'widget.pie-chart-widget',
	border: true,

    width: 500,
    height: 350,
    animate: true,
    store: Ext.create('Mirror.view.chart.PieChart.PieStore'),
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        angleField: 'data1',
        showInLegend: true,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                // calculate and display percentage on hover
                var isWithTotal = false;
                var total = 0;
                Ext.getCmp("content-panel-id").getActiveTab().down('pie-chart-widget').store.each(function(rec) {
                    total += rec.get('data1');
                    if (rec.get('total') != null) {
                    	isWithTotal = true;
                    }
                });
				var tipTitle = '';
				if (!isWithTotal) {
					tipTitle = storeItem.get('full_name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%';
				} else {
					tipTitle = storeItem.get('full_name');
				}
		        this.width = tipTitle.length * 8;
		        this.setTitle(tipTitle);
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: {
            field: 'short_name',
            display: 'rotate',
            contrast: true,
            font: '12px Arial'
        },
    }],
	loadStore: function(params) {
		var me = this;
		me.store = Ext.create('Mirror.view.chart.PieChart.PieStore');
		me.store.ownerCmp = me;
		me.store.getProxy().extraParams = {};
		Object.keys(params).forEach(function(key) {
		     me.store.getProxy().extraParams[key] = params[key];
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
		me.store.load();
	},
});