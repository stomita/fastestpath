Ext.define('FastestPath.store.MyListConfig', {
  extend: 'Ext.data.Store',
  requires: [
    'FastestPath.model.ListConfig'
  ],
  config: {
    storeId: 'myListConfig',
    model: 'FastestPath.model.ListConfig'
  }
});