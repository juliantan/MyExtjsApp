// 开启动态加载的核心
Ext.Loader.setConfig({enabled: true});

Ext.application({
  name: "Mirror",
  appFolder: "/javascripts/myapp",
  autoCreateViewport: true, //自动加载Viewport.js文件
  controllers: ['MainCtrl', 'TableConfCtrl'],
  //launch: function() {
    //Ext.tip.QuickTipManager.init();
  //}
});

