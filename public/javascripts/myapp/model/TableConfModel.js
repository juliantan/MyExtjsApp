Ext.define('Mirror.model.TableConfModel', {
  extend: 'Ext.data.Model',
  idProperty: 'ID',
  fields: [
    { name: 'ID', type: 'string' },
    { name: 'RefTable', type: 'string' },
    { name: 'ColName', type: 'string' },
    { name: 'ColType', type: 'string' },
  ],
  validations: [
    { type: 'presence', field: 'RefTable' },
    { type: 'presence', field: 'ColName' },
    { type: 'presence', field: 'ColType' }
  ]
});
