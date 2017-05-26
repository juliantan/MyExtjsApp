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
      
		tbar: [{
		    text: 'Expand All',
		    scope: this,
		    handler: this.onExpandAllClick
		}, {
		    text: 'Collapse All',
		    scope: this,
		    handler: this.onCollapseAllClick
		}],

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
              {id:'article-list-leaf-id',text:'Articles', leaf:true},
              {id:'user-count-leaf-id',text:'用户量', leaf:true},
              {id:'node-2', text:'QTP访问成功失败率', leaf:true}
            ] 
          },
          {id:'node-switch', text:'HCDN播放切换率', leaf:true},
        ]
      }
    });
    this.callParent(arguments);
  },
  
   onExpandAllClick: function(){
        var me = this,
        toolbar = me.down('toolbar');
            
        me.getEl().mask('Expanding tree...');
        toolbar.disable();
                    
        this.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
        });
    },
    
    onCollapseAllClick: function(){
        var toolbar = this.down('toolbar');
        toolbar.disable();
        this.collapseAll(function() {
            toolbar.enable();
        });
    },
})

