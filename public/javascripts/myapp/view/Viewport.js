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
        id:'desk',
        layout: 'border',
        items: [
          Ext.create('Mirror.view.layout.header'),
          Ext.create('Mirror.view.layout.menu'),
          Ext.create('Mirror.view.layout.tabPanel'),
          Ext.create('Mirror.view.layout.filter'),
          Ext.create('Mirror.view.layout.footer')
        ]
      }]
    });
    this.callParent(arguments);
  }
})
