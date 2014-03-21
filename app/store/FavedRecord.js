Ext.define('FastestPath.store.FavedRecord', {
  alias: 'store.faved',
  extend: 'Ext.data.Store',
  requires: [
    'FastestPath.model.FavedRecord'
  ],
  config: {
    storeId: 'favedRecord',
    model: 'FastestPath.model.FavedRecord',
    sorters: [{
      property: 'favedAt',
      direction: 'DESC'
    }],
    listeners: {
      addrecords: 'onChangeRecords',
      updaterecords: 'onChangeRecords',
      removerecords: 'onChangeRecords'
    }
  },
  onChangeRecords: function() {
    this.sync();
  }
});