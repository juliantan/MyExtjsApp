Ext.define('Mirror.view.layout.footer',{
  extend: 'Ext.Toolbar',
  initComponent : function(){
    Ext.apply(this,{
      id:"bottom",
      //frame:true,
      region:"south",
      height:23,
      items:["当前用户：Guest",'->',"技术支持:<a href='mailto:tanjunliang@qiyi.com' target='_blank' style='text-decoration:none;'><font color='#0000FF'>tanjunliang@qiyi.com</font></a>&nbsp;&nbsp;"]
    });
    this.callParent(arguments);
  }
})

