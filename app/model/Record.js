Ext.define('FastestPath.model.Record', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'id'
    }, {
      name: 'recordId'
    }, {
      name: 'title'
    }, {
      name: 'type'
    }, {
      name: 'caption'
    }, {
      name: 'subCaption'
    }, {
      name: 'date'
    }, {
      name: 'isGroup',
      type: 'boolean'
    }, {
      name: 'groupKey'
    }, {
      name: 'groupName'
    }, {
      name: 'count',
      type: 'int'
    }, {
      name: 'rowIndex',
      type: 'int'
    }, {
      name: 'icon'
    }]
  }
});
