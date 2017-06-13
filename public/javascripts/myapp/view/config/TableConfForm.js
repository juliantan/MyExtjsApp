Ext.define('Mirror.view.config.TableConfForm', {
  extend: 'Ext.window.Window',
  alias : 'widget.table-conf-form-widget',
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
        name : 'RefTable',
        fieldLabel: '表'
      }, {
        name : 'ColName',
        fieldLabel: '列名'
      }, {
        name : 'ColType',
        fieldLabel: '类型',
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
