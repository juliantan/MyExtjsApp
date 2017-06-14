Ext.define("Mirror.controller.KpiConfCtrl", {
	extend: 'Ext.app.Controller',
	config: {
		name: ''
	},

	//models: ['KpiConfModel'],
	//stores: ['KpiConfStore'],
	views: ['config.ConfigPanel', 'config.KpiConfPanel', 'config.KpiConfForm'],

	refs: [{
		ref: 'listref',
		selector: 'kpi-conf-panel-widget'
	}],

	init: function () {
		this.control({
			'kpi-conf-panel-widget': {
				itemdblclick: this.editItem,
				selectionchange: this.selectionChange
			},
			'kpi-conf-form-widget button[action=save]': {
				click: this.createOrUpdateItem
			},
			'kpi-conf-panel-widget button[action=addItem]': {
				click: this.addItem
			},
			'kpi-conf-panel-widget button[action=editItem]': {
				click: this.editItem
			},
			'kpi-conf-panel-widget button[action=deleteItem]': {
				click: this.deleteItem
			}
		});
		//this.callParent(arguments);
	},

	addItem: function () {
		var view = Ext.widget('kpi-conf-form-widget');
		view.show();
	},

	editItem: function(record) {
		var record = this.getListref().getSelectedItem();
		var view = Ext.widget('kpi-conf-form-widget');
		view.down('form').loadRecord(record);
	},

	//some errors
	createOrUpdateItem: function(button) {
		var win = button.up('window');
		var form = win.down('form');

		//var store = this.getKpiConfStoreStore();
		var store = Ext.widget('kpi-conf-panel-widget').store;
		var values = form.getValues();

		var item = Ext.create('Mirror.model.KpiConfModel', values);
		var errors = item.validate();

		if (errors.isValid()) {
			var me = this;
			var formRecord = form.getRecord();

			if (formRecord) {
				// perform update
				formRecord.set(values);
			} else {
				// perform create
				store.add(item);
			}

			store.sync({
				success: function() {
					win.close();
				},
				failure: function(batch, options) {
					// extract server side validation errors
					var serverSideValidationErrors = batch.exceptions[0].error;

					var errors = new Ext.data.Errors();
					for (var field in serverSideValidationErrors) {
						var message = serverSideValidationErrors[field];
						errors.add(undefined, { field: field, message: message });
					}
					form.getForm().markInvalid(errors);
				}
			});
		} else {
			form.getForm().markInvalid(errors);
		}
	},

	deleteItem: function() {
		var record = this.getListref().getSelectedItem();

		if (record) {
			//var store = this.getItemStoreStore();
			var store = Ext.widget('kpi-conf-panel-widget').store;
			store.remove(record);
			store.sync();
		}
	},

	selectionChange: function(selectionModel, selections) {
		var grid = this.getListref();

		if (selections.length > 0) {
			grid.enableRecordButtons();
		} else {
			grid.disableRecordButtons();
		}
	},
});
