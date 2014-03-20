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
      recordListPanel: 'main recordList',
      recordDetailDialog: '#recordDetail'
    }
  },

  launch: function() {

  },

  doTapRecord: function(recordList, index, target, record) {
    record = record.getData();
    console.log(record, recordList.getStore().getStoreId(), recordList.getStore());
    if (record.isGroup) {
      this.drillDownToGroupRecords(recordList, record);
    } else {
      this.showRecordDetail(recordList, record);
    }
  },

  getFrontdoorUrl: function(hash) {
    var conn = jsforce.browser.connection;
    return conn.instanceUrl + "/secur/frontdoor.jsp" +
      "?sid=" + conn.accessToken + 
      "&retURL=" + encodeURIComponent("/one/one.app" + (hash ? "#" + hash : ""));
  },

  drillDownToGroupRecords: function(recordList, record) {
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
  },

  showRecordDetail: function(recordList, record) {
    var recordDetailDialog = this.getRecordDetailDialog();
    recordDetailDialog.setRecordId(record.recordId);
    recordDetailDialog.show();
  }

});