/**
 * 程序主控制器
 */
Ext.define("Mirror.controller.MainCtrl",{
  extend: "Ext.app.Controller",

  refs:[
    {ref: 'menu', selector: 'tabPanel'}
  ],

  init: function(){
    this.control({
      'menu': {
         itemmousedown: this.loadMenu
      }
    })
  },

  loadMenu: function(selModel, record){
    console.log("record.get('id'):" + record.get('id'));
    if (record.get('leaf')) {
      var my = this;
      var panel = Ext.getCmp(record.get('id'));
      if (!panel) {
        switch (record.get('id')) {
          case "article-list-leaf-id":
            Ext.require('Mirror.controller.ArticleCtrl', function() {
              //此处会异步执行，先执行ext.require之外的代码
              var article = new Mirror.controller.ArticleCtrl();
              article.init(Mirror);
              panel = { xtype: 'article-list-widget' };
              my.openTab(panel, record.get('id'));
            });
            break;
          default:
            panel = {
              title: 'New Tab ' + record.get('id'),
              //iconCls: 'tabs',
              html: 'Tab Body ' + record.get('id') + '<br/><br/>',
              closable: true
            };
            my.openTab(panel, record.get('id'));
        };
        //this.openTab(panel,record.get('id'));
      } else {
        var main = Ext.getCmp("content-panel");
        main.setActiveTab(panel);
      }
    } else {
      console.log("not leaf");
    }
  },

  openTab: function(panel, id){
    var o = (typeof panel == "string" ? panel : id || panel.id);
    var main = Ext.getCmp("content-panel");
    var tab = main.getComponent(o);
    if (tab) {
      main.setActiveTab(tab);
    } else if(typeof panel!="string"){
      panel.id = o;
      var p = main.add(panel);
      main.setActiveTab(p);
    }
  }

});
