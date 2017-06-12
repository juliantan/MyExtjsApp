Ext.define('Mirror.view.config.ConfigPanel', {
	extend: 'Ext.panel.Panel',
	xtype: 'x_config_panel',
	alias: 'widget.als_config_panel',
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
			xtype: 'panel',
			title: '物理表配置',
		},
		{
			xtype: 'panel',
			title: '报表配置',
		},
	],
});