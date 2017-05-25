Ext.define('Mirror.view.layout.menu',{
  extend: 'Ext.tree.TreePanel',
  alias: 'widget.menu',
  initComponent : function(){
    Ext.apply(this,{
      id: 'menu-panel',
      title: 'Report List',
      //iconCls:'icon-menu',
      margins : '0 0 -1 1',
      region:'west',
      border : false,
      enableDD : false,
      split: true,
      width : 212,
      minSize : 130,
      maxSize : 300,

      containerScroll : true,
      collapsible : true,
      autoScroll: false,
      rootVisible: true,

      root:{
        text:'所有报表',
        expanded:true,
        leaf:false,
        children:[
          {
            id: 'node-qtp',
            text:'QTP库相关投递',
            leaf:false,
            expanded:true,
            children:[
              {id:'article-list',text:'用户量', leaf:true},
              {id:'node-2', text:'QTP访问成功失败率', leaf:true}
            ] 
          },
          {id:'node-switch', text:'HCDN播放切换率', leaf:true},
        ]
      }
    });
    this.callParent(arguments);
  }
})

