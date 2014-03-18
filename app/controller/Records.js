/*global jsforce, cordova*/
Ext.define('FastestPath.controller.Records', {
  extend: 'Ext.app.Controller',
  config: {
    detailWindow: null,
    control: {
      recordListPanel: {
        itemtap: 'doTapRecord'
      }
    },
    refs: {
      recordListPanel: 'main recordList'
    }
  },

  doTapRecord: function(recordList, index, target, record) {
    record = record.getData();
    console.log(record, recordList.getStore().getStoreId(), recordList.getStore());
    if (record.isGroup) {
      var navView = recordList.up('navigationview');
      navView.push({
        xtype: 'recordList',
        title: record.title,
        store: {
          type: 'report',
          reportId: recordList.getStore().getReportId(),
          groupKey: record.groupKey
        },
        listeners: {
          painted: function() { this.getStore().load(); }
        }
      });
    } else {
      this.showRecordDetail(record);
    }
  },

  getFrontdoorUrl: function(hash) {
    var conn = jsforce.browser.connection;
    return conn.instanceUrl + "/secur/frontdoor.jsp" +
      "?sid=" + conn.accessToken + 
      "&retURL=" + encodeURIComponent("/one/one.app" + (hash ? "#" + hash : ""));
  },

  showRecordDetail: function(record) {
    var hash = encodeURIComponent(btoa(JSON.stringify({
      componentDef: 'force:recordHome',
      attributes: {
        values: {
          recordId: record.recordId
        }
      }
    })));
    var conn = jsforce.browser.connection;
    var dw = this.getDetailWindow();
    if (!dw) {
      dw = window.open(this.getFrontdoorUrl(hash));
      this.setDetailWindow(dw);
    } else {
      var url = conn.instanceUrl + "/one/one.app#" + hash;
      if (dw.closed) {
        dw = window.open(url);
        this.setDetailWindow(dw);
      } else {
        dw.location.href = url;
      }
    }
  }

});