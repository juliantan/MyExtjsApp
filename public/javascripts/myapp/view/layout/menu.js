
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
                return raw.Title;
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
            	return raw.TableName != null && raw.TableName != '';
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
    	}
    },
});

Ext.define('Mirror.view.layout.menu',{
  extend: 'Ext.tree.TreePanel',
  alias: 'widget.menu',
  initComponent : function(){
    Ext.apply(this,{
      id: 'menu-panel-id',
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
		    text: '展开所有',
		    scope: this,
		    handler: this.onExpandAllClick
		}, {
		    text: '折叠所有',
		    scope: this,
		    handler: this.onCollapseAllClick
		}],
    });
    this.callParent(arguments);
  },
  loadData: function() {
  	this.store.load();
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

