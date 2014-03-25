/*global jsforce */
(function() {

Ext.define('FastestPath.store.Report', {
  alias: 'store.report',
  extend: 'FastestPath.store.Record',

  config: {
    reportId: null,
    groupKey: null
  },

  constructor: function(config) {
    this.callParent(arguments);
    this.getProxy().setExtraParams({
      reportId: config.reportId,
      groupKey: config.groupKey
    });
  },

  getCallKey: function(params) {
    return 'report-' + params.reportId + '-' + (params.fetchDetail ? 'detail' : 'summary');
  },

  doFetch: function(params, callback) {
    var conn = jsforce.browser.connection;
    var fetchDetails = params.fetchDetails !== false;
    conn.analytics.report(params.reportId).execute({ details: fetchDetails }, callback);
  },

  convertToResult: function(params, result) {
    var ri = new ReportInstance(result);
    var res = ri.getGroupedResult(params.groupKey);
    if (res.records.length === 0) {
      res = ri.getRecordSetResult(params.groupKey);
    }
    return this.callParent([ params, res ]);
  }

});

/**
 *
 */
function ReportInstance(result) {
  var meta = result.reportMetadata,
      extMeta = result.reportExtendedMetadata,
      factMap = result.factMap,
      hasDetailRows = result.hasDetailRows;

  function getRecordSetResult(groupKey) {
    var rows = getDetailRows(groupKey);
    var records = rows.map(function(row) {
      var cells = row.dataCells;
      var rec = {};
      var idField = findIdField(cells);
      var nameFields;
      var excludes = {};
      var iconField = findIconField(cells);
      if (iconField) {
        rec.icon = iconField.value;
        excludes[iconField.index] = true;
      }
      if (idField) {
        rec.recordId = idField.value;
        nameFields = findNameFields(cells, idField.value);
      }
      if (nameFields && nameFields.length > 0) {
        rec.title = nameFields.map(function(nf){ return nf.label; }).join(' ');
        nameFields.forEach(function(nameField) {
          excludes[String(nameField.index)] = true;
        });
      } else {
        var titleField = findFieldByType('string', cells);
        if (titleField) {
          rec.title = titleField.label;
          excludes[titleField.index] = true;
        }
      }
      var captions = [];
      var captionField = findFieldByTypeRegexp(cells, /^(string|picklist)$/, excludes);
      if (captionField) {
        rec.caption = captionField.label;
        excludes[captionField.index] = true;
      }
      var subCaptionField = 
        findFieldByTypeRegexp(cells, /^(percent|currency)$/, excludes) ||
        findFieldByTypeRegexp(cells, /^(picklist|string)$/, excludes);
      if (subCaptionField) {
        rec.subCaption = subCaptionField.label;
        excludes[captionField.index] = true;
      }
      var dateField = findFieldByTypeRegexp(cells, /^(date|datetime)$/);
      if (dateField) {
        rec.date = dateField.label;
        excludes[dateField.index] = true;
      }

      return rec;
    });
    return { size: rows.length, records: records };
  }

  function getGroupedResult(groupKey) {
    var groups = [];
    var scanGroups = function(grouping) {
      if (grouping.key === groupKey) {
        groups = (grouping.groupings || []).map(function(cgrouping) {
          var key = [ cgrouping.key || "T", "T" ].join('!');
          var aggregates = factMap[key].aggregates;
          var caption = aggregates.length > 0 && meta.aggregates[0] !== 'RowCount' ? aggregates[0].label : '';
          var count = -1;
          for (var i=0; i<meta.aggregates.length; i++) {
            if (meta.aggregates[i] === 'RowCount') {
              count = aggregates[i].value;
              break;
            }
          }
          return {
            title: cgrouping.label,
            recordId: isIdLike(cgrouping.value) ? cgrouping.value : undefined,
            caption: caption,
            isGroup: hasDetailRows || (cgrouping.groupings && cgrouping.groupings.length > 0),
            groupKey: cgrouping.key,
            count: count
          };
        });
      } else if (grouping.groupings.length > 0) {
        grouping.groupings.forEach(scanGroups);
      }
    };
    scanGroups(result.groupingsDown);
    return { size: groups.length, records: groups };
  }

  function getDetailRows(groupKey) {
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
        if (!groupKey || groupingD.key === groupKey) {
          var key = [ groupingD.key || "T", groupingA.key || "T" ].join('!');
          rows.push.apply(rows, factMap[key].rows || []);
        }
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

  function findField(cells, fn, excludes) {
    excludes = excludes || {};
    for (var i=0, len=cells.length; i<len; i++) {
      if (excludes[i]) { continue; }
      var cell = cells[i];
      if (fn(cell, i)) {
        return { index: i, label: cell.label, value: cell.value };
      }
    }
  }

  function findFields(cells, fn, excludes) {
    excludes = excludes || {};
    var fields = [];
    for (var i=0, len=cells.length; i<len; i++) {
      if (excludes[i]) { continue; }
      var cell = cells[i];
      if (fn(cell, i)) {
        fields.push({ index: i, label: cell.label, value: cell.value });
      }
    }
    return fields;
  }

  function findIdField(cells, excludes) {
    return findField(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return (colInfo.dataType==='id' ||
              (colInfo.dataType === 'string' && isIdLike(cell.value)));
    }, excludes);
  }

  function findNameFields(cells, id, excludes) {
    return findFields(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return colInfo.dataType === 'string' && cell.value === id;
    }, excludes);
  }

  function findFieldByType(cells, dataType, excludes) {
    return findField(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return colInfo.dataType === dataType;
    }, excludes);
  }

  function findFieldByTypeRegexp(cells, regexp, excludes) {
    return findField(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return regexp.test(colInfo.dataType);
    }, excludes);
  }

  function findIconField(cells, excludes) {
    return findField(cells, function(cell, i) {
      var colInfo = getColumnInfo(i);
      return colInfo.label === 'icon' && colInfo.dataType === 'string';
    }, excludes);   
  }

  function isIdLike(str) {
    return typeof str === 'string' && /^[0-9a-zA-Z]{15,18}$/.test(str);
  }

  return {
    getGroupedResult: getGroupedResult,
    getRecordSetResult: getRecordSetResult,
    getDetailRows: getDetailRows,
    getColumnInfo: getColumnInfo,
    findIdField: findIdField,
    findNameFields: findNameFields,
    findFieldByType: findFieldByType,
    findFieldByTypeRegexp: findFieldByTypeRegexp
  };

}

})();