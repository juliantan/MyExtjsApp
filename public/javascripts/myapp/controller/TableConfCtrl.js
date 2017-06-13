Ext.define("Mirror.controller.TableConfCtrl", {
	extend: 'Ext.app.Controller',
	config: {
		name: ''
	},

	//models: ['TableConfModel'],
	//stores: ['TableConfStore'],
	views: ['config.ConfigPanel', 'config.TableConfPanel', 'config.TableConfForm'],

	refs: [{
		ref: 'listref',
		selector: 'table-conf-panel-widget'
	}],

	init: function () {
		this.control({
			'table-conf-panel-widget': {
				itemdblclick: this.editItem,
				selectionchange: this.selectionChange
			},
			'table-conf-form-widget button[action=save]': {
				click: this.createOrUpdateItem
			},
			'table-conf-panel-widget button[action=addItem]': {
				click: this.addItem
			},
			'table-conf-panel-widget button[action=editItem]': {
				click: this.editItem
			},
			'table-conf-panel-widget button[action=deleteItem]': {
				click: this.deleteItem
			}
		});
		//this.callParent(arguments);
	},

	addItem: function () {
		var view = Ext.widget('table-conf-form-widget');
		view.show();
	},

	editItem: function(record) {
		var record = this.getListref().getSelectedItem();
		var view = Ext.widget('table-conf-form-widget');
		view.down('form').loadRecord(record);
	},

	//some errors
	createOrUpdateItem: function(button) {
		var win = button.up('window');
		var form = win.down('form');

		//var store = this.getTableConfStoreStore();
		var store = Ext.widget('table-conf-panel-widget').store;
		var values = form.getValues();

		var item = Ext.create('Mirror.model.TableConfModel', values);
		var errors = item.validate();

		if (errors.isValid()) {
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
			var store = Ext.widget('table-conf-panel-widget').store;
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
	}
});
