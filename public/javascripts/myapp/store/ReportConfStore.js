Ext.define('Mirror.store.ReportConfStore', {
  extend: 'Ext.data.Store',

  model: 'Mirror.model.ReportConfModel',
  pageSize: 10,
  //baseParams: {limit: 10},
  autoLoad: {params: {start:0, limit:10}},
  //autoLoad: true,
  autoSync: false,

  proxy: {
    type: 'rest',
    url: '/conf/reportconfigs',
    model: 'Mirror.model.ReportConfModel',
    noCache: false,
    reader: {
      type: 'json',
      root: 'data',
      totalProperty: 'totalCount',
      successProperty: 'success'
    }
  }
});
