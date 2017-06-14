Ext.define('Mirror.view.config.KpiConfForm', {
  extend: 'Ext.window.Window',
  alias : 'widget.kpi-conf-form-widget',
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
        fieldLabel: '表名'
      }, {
        name : 'KpiName',
        fieldLabel: 'KPI名'
      }, {
        name : 'Formula',
        fieldLabel: 'KPI公式',
      }, {
        name : 'KpiUnit',
        fieldLabel: 'KPI单位',
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
