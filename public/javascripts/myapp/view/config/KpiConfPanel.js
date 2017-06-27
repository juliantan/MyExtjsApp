Ext.define('Mirror.view.config.KpiConfPanel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.kpi-conf-panel-widget',
  title: 'All KPIs',
  store: Ext.create('Mirror.store.KpiConfStore'),
  closable:true,
  colseAction:'destory',

  initComponent: function () {
    this.columns = [{
      header: 'ID',
      dataIndex: 'ID',
      flex: 1
    }, {
      header: '表名',
      dataIndex: 'RefTable',
      flex: 1
    }, {
      header: 'KPI名',
      dataIndex: 'KpiName',
      flex: 1
    }, {
      header: 'KPI公式',
      dataIndex: 'Formula',
      flex: 1
    }, {
      header: 'KPI单位',
      dataIndex: 'KpiUnit',
      flex: 1
    }, {
      header: 'KPI数据显示格式',
      dataIndex: 'KpiDataFormat',
      flex: 1
    },];

    this.addItemButton = new Ext.Button({
      icon: 'images/add.ico',
      text: 'Add Item',
      action: 'addItem'
    });

    this.editItemButton = new Ext.Button({
      icon: 'images/edit.ico',
      text: 'Edit Item',
      action: 'editItem',
      disabled: true
    });

    this.deleteItemButton = new Ext.Button({
      icon: 'images/del.ico',
      text: 'Delete Item',
      action: 'deleteItem',
      disabled: true
    });

    this.tbar = [this.addItemButton, this.editItemButton, this.deleteItemButton];
	var me = this;
    this.paging = new Ext.PagingToolbar({
      //pageSize: 10,
      store: me.store,
      displayInfo: true
    });

    this.bbar = [this.paging];
    this.callParent(arguments);
  },

  getSelectedItem: function() {
    return this.getSelectionModel().getSelection()[0];
  },

  enableRecordButtons: function() {
    this.editItemButton.enable();
    this.deleteItemButton.enable();
  },

  disableRecordButtons: function() {
    this.editItemButton.disable();
    this.deleteItemButton.disable();
  }
});
