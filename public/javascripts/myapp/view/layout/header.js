Ext.define('Mirror.view.layout.header', {
  extend: 'Ext.Component',
  initComponent: function() {
    Ext.applyIf(this, {
      xtype: 'box',
      cls: 'header',
      region: 'north',
      //html: '<br><center><font size = 5>Mirror Report Analysis</font></center>',
      height: 0
    });
    this.callParent(arguments);
  }
});
