Ext.define("Mirror.controller.ArticleCtrl", {
  extend: 'Ext.app.Controller',
  id: 'article-controller',
  config: {
    name: 'Product Name'
  },

  models: ['ArticleModel'],
  stores: ['ArticleStore'],
  views: ['article.list', 'article.form'],

  refs: [{
    ref: 'listref',
    selector: 'article-list-widget'
  }],

  init: function () {
    this.control({
      'article-list-widget': {
        itemdblclick: this.editArticle,
        selectionchange: this.selectionChange
      },
      'article-form-widget button[action=save]': {
        click: this.createOrUpdateArticle
      },
      '#article-list-leaf-id button[action=addArticle]': {
        click: this.addArticle
      },
      '#article-list-leaf-id button[action=editArticle]': {
        click: this.editArticle
      },
      '#article-list-leaf-id button[action=deleteArticle]': {
        click: this.deleteArticle
      }
    });
    //this.callParent(arguments);
  },

  addArticle: function () {
    var view = Ext.widget('article-form-widget');
    view.show();
  },

  editArticle: function(record) {
    var record = this.getListref().getSelectedArticle();
    var view = Ext.widget('article-form-widget');
    view.down('form').loadRecord(record);
  },

  //some errors
  createOrUpdateArticle: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getArticleStoreStore();
    var values = form.getValues();

    var article = Ext.create('Mirror.model.ArticleModel', values);
    var errors = article.validate();

    if (errors.isValid()) {
      var formRecord = form.getRecord();

      if (formRecord) {
        // perform update
        formRecord.set(values);
      } else {
        // perform create
        store.add(article);
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

  deleteArticle: function() {
    var record = this.getListref().getSelectedArticle();

    if (record) {
      var store = this.getArticleStoreStore();
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
