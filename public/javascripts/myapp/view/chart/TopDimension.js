Ext.define('Mirror.view.chart.TopDimension', {
	extend: 'Ext.chart.Chart',
	id: 'topDimensionId',
	alias : 'widget.top-dimension-widget',
	border: true,
	
    animate: true,
    shadow: true,
    store: store1,
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['data1'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Number of Hits',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'left',
        fields: ['name'],
        title: 'Month of the Year'
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
            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
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
    }]
});