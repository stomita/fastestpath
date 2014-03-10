/*global jsforce */
Ext.define('FastestPath.store.Report', {
  alias: 'store.report',
  extend: 'FastestPath.store.Record',

  constructor: function(config) {
    this.callParent(arguments);
    this.getProxy().setExtraParams({ reportId: config.reportId });
  },

  doAsyncRequest: function(params, callback) {
    var me = this;
    var conn = jsforce.browser.connection;
    conn.analytics.report(params.reportId).execute({ details: true }, function(err, result) {
      if (err) { return callback(err); }
      var factMap = result.factMap;
      var rows = [];
      var scanRows = function(groupingD, groupingA) {
        if (groupingD.groupings.length > 0) {
          groupingD.groupings.forEach(function(cgroupingD) {
            scanRows(cgroupingD, groupingA);
          });
        } else if (groupingA.groupings.length > 0) {
          groupingA.groupings.forEach(function(cgroupingA) {
            scanRows(groupingD, cgroupingA);
          });
        } else {
          var key = [ groupingD.key || "T", groupingA.key || "T" ].join('!');
          rows.push.apply(rows, factMap[key].rows || []);
        }
      };
      scanRows(result.groupingsDown, result.groupingsAcross);
      var records = rows.map(function(row) {
        var cell = row.dataCells[0];
        return { Name: cell.label, Id: cell.value };
      });
      callback(null, { records: records });
    });
  }
});

