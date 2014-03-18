/*global jsforce */
Ext.define('FastestPath.store.ReportDef', {
  alias: 'store.reportDef',
  extend: 'FastestPath.store.Record',

  constructor: function(config) {
    console.log('report def');
    this.callParent(arguments);
    this.getProxy().setExtraParams({ query: config.query });
  },

  doFetch: function(params, callback) {
    var me = this;
    var conn = jsforce.browser.connection;
    var fields = ['Id', 'Name'];
    var condition = {};
    if (params.query) {
      condition.Name = { $like : '%' + params.query + '%' };
    }
    var query = conn.sobject('Report')
      .find(condition, fields)
      .limit(params.limit)
      .offset(params.start)
      .execute(function(err, records) {
        if (err) { return callback(err); }
        callback(null, { size: query.totalSize, records: records });
      });
  }
});

