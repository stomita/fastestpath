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
      var rows = result.factMap["T!T"].rows || [];
      var records = rows.map(function(row) {
        var cell = row.dataCells[0];
        return { Name: cell.label, Id: cell.value };
      });
      console.log("*** Fetched ***", records);
      me.setData(records);
    });
  }
});