Ext.define('FastestPath.store.FavedRecord', {
  alias: 'store.faved',
  extend: 'Ext.data.Store',
  requires: [
    'FastestPath.model.FavedRecord'
  ],
  config: {
    storeId: 'favedRecord',
    model: 'FastestPath.model.FavedRecord'
  }
});