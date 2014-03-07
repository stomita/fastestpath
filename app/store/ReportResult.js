/*global jsforce,cordova */
Ext.define('FastestPath.store.ReportResult', {
  alias: 'store.reportResult',
  extend: 'Ext.data.Store',

  createConfig: function(config) {
    return {
      fields: [ 'Name' ],
      data: []
    };
  },

  constructor: function(config) {
    this.callParent([ this.createConfig(config) ]);
    var me = this;
    var conn = jsforce.browser.connection;
    console.log("### Executing " + config.reportId + " ###");
    conn.analytics.report(config.reportId).execute({ details: true }, function(err, result) {
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
      console.log("*** Fetched ***", records);
      me.setData(records);
    });
  }
});