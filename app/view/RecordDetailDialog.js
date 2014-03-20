/*global jsforce*/
(function() {

var lastLoggedIn = -1;

Ext.define('FastestPath.view.RecordDetailDialog', {
  extend: 'Ext.Sheet',
  xtype: 'recordDetail',
  config: {
    recordId: null,
    hidden: true,
    hideOnMaskTap: true,
    layout: 'fit',
    width: '100%',
    height: '100%',
    style: 'background-color: white',
    control: {
      'button#close': {
        tap: 'hide'
      }
    },
    enter: 'right',
    exit: 'right',
    showAnimation: 'flip',
    hideAnimation: 'slideOut',
    items: [{
      itemId: 'detailViewContent',
      html: '<iframe style="width:100%;height:100%;border:0;display:none;" src="about:blank"></iframe>'
    }, {
      xtype: 'toolbar',
      docked: 'bottom',
      items: [{
        xtype: 'button',
        itemId: 'close',
        align: 'left',
        text: 'Close'
      }]
    }]
  },

  initialize: function() {
    this.callParent(arguments);
    this.initDetailView();
  },

  initDetailView: function() {
    var iframe = this.iframe = this.getComponent('detailViewContent').element.query('iframe')[0];
    iframe.parentNode.style.height = '100%';
    this.on({
      show: function() {
        iframe.style.display = 'block';
      },
      hide: function() {
        iframe.style.display = 'none';
      }
    });
  },

  applyRecordId: function(recordId) {
    if (!recordId) { return; }
    var hash = encodeURIComponent(btoa(JSON.stringify({
      componentDef: 'force:recordHome',
      attributes: {
        values: { recordId: recordId }
      }
    })));
    var url, now = new Date().getTime();
    if (lastLoggedIn > now - 2 * 60 * 60 * 1000) { // within 2 hours
      var conn = jsforce.browser.connection;
      url = conn.instanceUrl + "/one/one.app#" + hash;
    } else {
      lastLoggedIn = now;
      url = this.getFrontdoorUrl(hash);
    }
    this.openUrl(url);
  },

  openUrl: function(url) {
    this.iframe.contentWindow.location.href = url;
  },

  getFrontdoorUrl: function(hash) {
    var conn = jsforce.browser.connection;
    return conn.instanceUrl + "/secur/frontdoor.jsp" +
      "?sid=" + conn.accessToken + 
      "&retURL=" + encodeURIComponent("/one/one.app" + (hash ? "#" + hash : ""));
  }

});

})();
