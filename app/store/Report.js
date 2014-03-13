/*global jsforce */
(function() {

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
      var ri = new ReportInstance(result);
      var records = ri.getRecords();
      callback(null, { records: records });
    });
  }
});

/**
 *
 */
function ReportInstance(result) {
  var meta = result.reportMetadata,
      extMeta = result.reportExtendedMetadata,
      factMap = result.factMap;

  function getRecords() {
    var rows = getDetailRows();
    return rows.map(function(row) {
      var cells = row.dataCells;
      var rec = {};
      var idField = findIdField(cells);
      if (idField) {
        rec.Id = idField.value;
      }
      var nameField = findNameField(cells);
      if (nameField) {
        console.log('nameField', nameField);
        rec.Name = nameField.label;
      }
      var captions = [];
      var captionField =
        findFieldByTypeRegexp(cells, /^(string|picklist)$/, nameField ? nameField.index + 1 : 0);
      if (captionField) {
        rec.Caption = captionField.label;
      }
      var subCaptionField = 
        findFieldByTypeRegexp(cells, /^(percent|currency)$/) ||
        findFieldByType(cells, 'picklist', captionField ? captionField.index + 1 : 0);
      if (subCaptionField) {
        rec.SubCaption = subCaptionField.label;
      }
      var dateField = findFieldByType(cells, 'date');
      if (dateField) {
        rec.Date = dateField.label;
      }
      return rec;
    });
  }

  function getDetailRows() {
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
    return rows;
  }

  function getColumnInfo(idx) {
    var columnName = meta.detailColumns[idx];
    var columnInfo = extMeta.detailColumnInfo[columnName];
    return {
      name: columnName,
      label: columnInfo.label,
      dataType: columnInfo.dataType
    };
  }

  function findField(cells, fn, startIdx) {
    console.log(startIdx);
    startIdx = startIdx || 0;
    for (var i=startIdx, len=cells.length; i<len; i++) {
      var cell = cells[i];
      if (fn(cell, i)) {
        return { index: i, label: cell.label, value: cell.value };
      }
    }
  }

  function findIdField(cells, startIdx) {
    return findField(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return (colInfo.dataType==='id' ||
              (colInfo.dataType === 'string' && isIdLike(cell.value)));
    }, startIdx);
  }

  function findNameField(cells, startIdx) {
    return findField(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return colInfo.dataType === 'string' && isIdLike(cell.value);
    }, startIdx);
  }

  function findFieldByType(cells, dataType, startIdx) {
    return findField(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return colInfo.dataType === dataType;
    }, startIdx);
  }

  function findFieldByTypeRegexp(cells, regexp, startIdx) {
    return findField(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return regexp.test(colInfo.dataType);
    }, startIdx);
  }

  function isIdLike(str) {
    return typeof str === 'string' && /^[0-9a-zA-Z]{15,18}$/.test(str);
  }

  return {
    getRecords: getRecords,
    getDetailRows: getDetailRows,
    getColumnInfo: getColumnInfo,
    findIdField: findIdField,
    findNameField: findNameField,
    findFieldByType: findFieldByType,
    findFieldByTypeRegexp: findFieldByTypeRegexp
  };

}

})();