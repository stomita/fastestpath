/*global jsforce */
Ext.define('FastestPath.store.Recent', {
  alias: 'store.recent',
  extend: 'FastestPath.store.Record',

  constructor: function(config) {
    this.callParent(arguments);
    if (config.sobjectType) {
      this.getProxy().setExtraParams({ sobjectType: config.sobjectType });
    }
  },

  doAsyncRequest: function(params, callback) {
    var me = this;
    var conn = jsforce.browser.connection;
    var target = params.sobjectType ? conn.sobject(params.sobjectType) : conn;
    target.recent(function(err, records) {
      callback(err, records);
    });
  }
});

