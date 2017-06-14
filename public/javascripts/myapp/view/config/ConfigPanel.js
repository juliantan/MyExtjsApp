Ext.define('Mirror.view.config.ConfigPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'x_config_panel',
	alias: 'widget.config-panel-widget',
    layout: {
        type: 'accordion',
        animate: true,
        activeOnTop: true
    },
	items: [
		{
			xtype: 'panel',
			title: '帮助',
			html: '<b>No help context for the moment.</b>',
		},
		{
			xtype: 'table-conf-panel-widget',
			title: '表配置',
		},
		{
			xtype: 'report-conf-panel-widget',
			title: '报表配置',
		},
		{
			xtype: 'kpi-conf-panel-widget',
			title: 'KPI配置',
		},
	],
});