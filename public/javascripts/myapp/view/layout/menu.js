
treeListStore = Ext.create('Ext.data.TreeStore', {
        proxy: {
            type: 'ajax',
            url: 'getReportList.do',
	        reader: {
	            type: 'json',
	            root: 'data'
	        },
        },
        fields: [
        	{
	            name: 'text',
	            mapping: function(raw) {
	                var result = (raw.MirrorId != null ? (raw.MirrorId + '_') : '') + raw.Title;
	                return result;
		        }
	        },
	        {
	            name: 'id',
	            mapping: function(raw) {
	                var ids = raw.ID;
	                return '' + ids;
	            }
			},
	        {
	            name: 'leaf',
	            mapping: function(raw) {
	            	return raw.TableName != null;
	            }
			},
			{
	            name: 'tbl_name',
	            mapping: function(raw) {
	            	if (raw.TableName != null) {
	            		return raw.TableName;
	            	} else {
	            		return '';
	            	}
	            }
			},
        ],
        root: {
            text: '所有报表',
            id: '',
            expanded: true,
        },
        folderSort: true,
        sorters: [{
            property: 'text',
            direction: 'ASC'
        }],
	    listeners: {
	    	load: function(){
	    		console.log('loaded');
	    	}
	    },
    });

Ext.define('Mirror.view.layout.menu',{
  extend: 'Ext.tree.TreePanel',
  alias: 'widget.menu',
  initComponent : function(){
    Ext.apply(this,{
      //id: 'menu-panel-id',
      title: '报表列表',
      //iconCls:'icon-menu',
      margins : '0 0 -1 1',
      region:'west',
      border : false,
      enableDD : false,
      split: true,
      width : 212,
      minSize : 130,
      maxSize : 300,
      
      store: treeListStore,

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

      /*root:{
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
      }*/
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

