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
        name : 'id',
        fieldLabel: 'id'
      }, {
        name : 'user',
        fieldLabel: '作者'
      }, {
        name : 'title',
        fieldLabel: '标题'
      }, {
        xtype: 'datefield',
        name : 'happened_at',
        fieldLabel: '发生时间',
        format: 'Y-m-d'
      }, {
        name : 'content',
        fieldLabel: '内容',
        xtype: 'htmleditor',
        height: 200,
        anchor: '100%'
      }]
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
