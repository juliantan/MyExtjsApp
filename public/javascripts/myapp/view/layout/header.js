Ext.define('Demo.view.layout.header', {
  extend: 'Ext.Component',
  initComponent: function() {
    Ext.applyIf(this, {
      xtype: 'box',
      cls: 'header',
      region: 'north',
      html: '<br><center><font size = 5>Mirror Report Analysis</font></center>',
      height: 50
    });
    this.callParent(arguments);
  }
});
