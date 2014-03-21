Ext.define('FastestPath.model.FavedRecord', {
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
      name: 'isGroup'
    }, {
      name: 'favedAt',
      type: 'int'
    }],
    proxy: {
      type: 'localstorage',
      id: 'fp_faved_records'
    }
  }
});
