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

  doTapRecord: function(me, index, target, record) {
    this.showRecordDetail(record);
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
          recordId: record.get('Id')
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