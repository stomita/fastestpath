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

  doTapRecord: function(recordList, index, target, record, e) {
    record = record.getData();
    if (record.isGroup) {
      this.drillDownToGroupRecords(recordList, record);
    } else if (Ext.fly(e.target).hasCls('fp-list-record-favmark')) {
      this.addToFavorites(target, record);
    } else {
      this.showRecordDetail(recordList, record);
    }
  },

  addToFavorites: function(target, record) {
    var el = target.element.down('.fp-list-record');
    var favStore = Ext.StoreManager.lookup('favedRecord');
    if (el.hasCls('faved')) {
      el.removeCls('faved');
      var idx = favStore.find('recordId', record.recordId);
      if (idx >= 0) {
        favStore.removeAt(idx);
      }
    } else {
      el.addCls('faved');
      var newrec = Ext.create('FastestPath.model.FavedRecord', {
        id: record.recordId,
        recordId: record.recordId,
        type: record.type,
        title: record.title,
        caption: record.caption,
        subCaption: record.subCaption,
        date: record.date,
        favedAt: new Date().getTime()
      });
      newrec.phantom = true;
      favStore.add(newrec);
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