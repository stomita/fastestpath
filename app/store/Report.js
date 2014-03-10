/*global jsforce */
(function() {

Ext.define('FastestPath.store.Report', {
  alias: 'store.report',
  extend: 'Ext.data.Store',
  requires: [
    'FastestPath.model.Report',
    'Ext.data.proxy.Direct'
  ],
  config: {
    model: 'FastestPath.model.Report'
  },
  constructor: function(config) {
    this.callParent(arguments);
    this.setProxy({
      type: 'direct',
      directFn: toDirectFn(executeReportAsync),
      extraParams: {
        reportId: config.reportId
      },
      reader: {
        type: 'json',
        idProperty: 'Id',
        rootProperty: 'records'
      }
    });
  }
});


function toDirectFn(fn) {
  fn.directCfg = {
    method: {
      getArgs: function(params) { return [ params ]; }
    }
  };
  return fn;
}

function createHandler(callback) {
  return function(err, res) {
    callback(res, {
      getStatus: function() {
        return !err;
      },
      getResult: function() {
        return res;
      }
    });
  };
}

function executeReportAsync(params, callback, store) {
  callback = createHandler(callback);
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

})();