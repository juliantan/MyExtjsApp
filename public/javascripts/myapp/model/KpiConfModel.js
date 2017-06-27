Ext.define('Mirror.model.KpiConfModel', {
  extend: 'Ext.data.Model',
  idProperty: 'ID',
  fields: [
    { name: 'ID', type: 'string' },
    { name: 'RefTable', type: 'string' },
    { name: 'KpiName', type: 'string' },
    { name: 'Formula', type: 'string' },
    { name: 'KpiUnit', type: 'string' },
    { name: 'KpiDataFormat', type: 'string' },
  ],
  validations: [
    { type: 'presence', field: 'RefTable' },
    { type: 'presence', field: 'KpiName' },
    { type: 'presence', field: 'Formula' },
  ]
});
