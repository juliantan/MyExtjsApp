Ext.define('Mirror.store.KpiConfStore', {
  extend: 'Ext.data.Store',

  model: 'Mirror.model.KpiConfModel',
  pageSize: 10,
  //baseParams: {limit: 10},
  autoLoad: {params: {start:0, limit:10}},
  //autoLoad: true,
  autoSync: false,

  proxy: {
    type: 'rest',
    url: '/conf/kpiconfigs',
    model: 'Mirror.model.KpiConfModel',
    noCache: false,
    reader: {
      type: 'json',
      root: 'data',
      totalProperty: 'totalCount',
      successProperty: 'success'
    }
  }
});
