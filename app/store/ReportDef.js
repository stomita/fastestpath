/*global jsforce */
Ext.define('FastestPath.store.ReportDef', {
  alias: 'store.reportDef',
  extend: 'FastestPath.store.Record',

  constructor: function(config) {
    console.log('report def');
    this.callParent(arguments);
    this.getProxy().setExtraParams({ query: config.query });
  },

  doAsyncRequest: function(params, callback) {
    console.log("doAsyncReq");
    var me = this;
    var conn = jsforce.browser.connection;
    console.log(params);
    var fields = ['Id', 'Name'];
    var condition = {};
    if (params.query) {
      condition.Name = { $like : '%' + params.query + '%' };
    }
    conn.sobject('Report')
      .find(condition, fields)
      .limit(params.limit)
      .offset(params.start)
      .execute(function(err, records) {
        if (err) { return callback(err); }
        callback(null, { records: records });
      });
  }
});

