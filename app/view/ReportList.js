Ext.define('FastestPath.view.ReportList', {
  extend: 'FastestPath.view.MyList',
  xtype: 'reportList',
  config: {
    fetchDetails: null,
    flattened: null
  },

  initialize: function() {
    this.callParent(arguments);
    this.down('recordList').setGrouped(true);
  },

  applyFetchDetails: function(fetchDetails) {
    this.setStoreBaseParameter('fetchDetails', fetchDetails);
    return fetchDetails;
  },

  setStoreBaseParameter: function(name, value) {
    var proxy = this.getStore().getProxy();
    var eparams = proxy.getExtraParams();
    eparams[name] = value;
    proxy.setExtraParams(eparams);
  },

  applyFlattened: function(flattened) {
    this.setStoreBaseParameter('flattened', flattened);
    if (flattened) {
      this.down('recordList').setGrouped(flattened);
    }
    return flattened;
  },

  applyStore: function(store) {
    this.callParent(arguments);
    store = this.getStore();
    if (store) {
      var me = this;
      store.on('load', function(store, records, success, operation) {
        var grouped = me.getFlattened();
        me.down('recordList').setGrouped(grouped);
      }, this);
    }
  },

  loadListConfig: function(record) {
    var oldFetchDetails = this.getFetchDetails();
    this.setFetchDetails(record.get('fetchDetails'));
    this.setFlattened(record.get('flattened'));
    this.getStore().load({ params: { refresh: oldFetchDetails !== this.getFetchDetails() }, start: 0 });
  }

});
