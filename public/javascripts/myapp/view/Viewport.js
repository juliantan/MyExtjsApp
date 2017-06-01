Ext.define('Mirror.view.Viewport',{
  extend: 'Ext.Viewport',
  layout: 'fit',
  hideBorders: true,
  requires : [
    'Mirror.view.layout.header',
    'Mirror.view.layout.menu',
    'Mirror.view.layout.tabPanel',
    'Mirror.view.layout.filter',
    'Mirror.view.layout.footer'
  ],
  initComponent : function(){
    Ext.apply(this, {
      items: [{
        id: 'desk',
        layout: 'border',
        items: [
          Ext.create('Mirror.view.layout.header', {id: 'header-panel-id'}),
          Ext.create('Mirror.view.layout.menu', {id: 'menu-panel-id'}),
          Ext.create('Mirror.view.layout.tabPanel', {id: 'content-panel-id'}),
          Ext.create('Mirror.view.layout.filter', {id: 'filter-panel-id'}),
          Ext.create('Mirror.view.layout.footer', {id: 'footer-panel-id'})
        ]
      }]
    });
    this.callParent(arguments);
  }
})
