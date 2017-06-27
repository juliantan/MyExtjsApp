Ext.define('Mirror.view.config.ReportConfForm', {
  extend: 'Ext.window.Window',
  alias : 'widget.report-conf-form-widget',
  title : 'Add / Edit',
  layout: 'fit',
  autoShow: true,

  initComponent: function() {
    this.items = [{
      xtype: 'form',
      bodyPadding: 8,
      width: 580,
      fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 65,
        inputWidth: 300
      },
      defaultType: 'textfield',
      items: [{
        xtype: 'hidden',
        name : 'ID',
        fieldLabel: 'ID'
      }, {
        name : 'Title',
        fieldLabel: '报表名'
      }, {
        name : 'TableName',
        fieldLabel: '表名',
      }, {
        name : 'ParentId',
        fieldLabel: '上层ID',
      },]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  }
});
