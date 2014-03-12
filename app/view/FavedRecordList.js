Ext.define('FastestPath.view.FavedRecordList', {
  extend: 'FastestPath.view.TitledList',
  xtype: 'favedRecordList',
  config: {
    store: {
      fields: ['Id', 'Name'],
      data: []
    }
  }

});