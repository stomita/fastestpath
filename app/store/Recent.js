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

  getCallKey: function(params) {
    return 'recent-' + (params.sobjectType || '');
  },

  doFetch: function(params, callback) {
    var me = this;
    var conn = jsforce.browser.connection;
    var target = params.sobjectType ? conn.sobject(params.sobjectType) : conn;
    conn.describeGlobal$(function(err, res) {
      if (err) { return callback(err); }
      var sobjects = {};
      res.sobjects.forEach(function(so) {
        sobjects[so.name] = so;
      });
      target.recent(function(err, records) {
        if (err) { return callback(err); }
        records = records.map(function(rec) {
          var so = sobjects[rec.attributes.type];
          return {
            id: rec.Id,
            type: so && so.label,
            title: rec.Name || rec.Subject || rec.Title || rec.FriendlyName ||
                   rec.CaseNumber || rec.ContractNumber || rec.LineItemNumber ||
                   rec.Domain || rec.LocalPart || rec.FunctionName || rec.DeveloperName ||
                   rec.LastName || rec.FirstName || rec.ConnectionName || rec.LineNumber ||
                   rec.SolutionName
          };
        });
        callback(null, { size: records.length, records: records });
      });
    });
  }
});

