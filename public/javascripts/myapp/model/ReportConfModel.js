Ext.define('Mirror.model.ReportConfModel', {
  extend: 'Ext.data.Model',
  idProperty: 'ID',
  fields: [
    { name: 'ID', type: 'string' },
    { name: 'Title', type: 'string' },
    { name: 'TableName', type: 'string' },
    { name: 'ParentId', type: 'string' },
  ],
  validations: [
    { type: 'presence', field: 'Title' },
    { type: 'presence', field: 'TableName' },
  ]
});
