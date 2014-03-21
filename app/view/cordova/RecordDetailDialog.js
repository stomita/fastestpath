/*global jsforce*/
Ext.define('FastestPath.view.cordova.RecordDetailDialog', {
  extend: 'FastestPath.view.RecordDetailDialog',
  xtype: 'cordovaRecordDetail',

  initDetailView: function() {
    var self = this;
    jsforce.browser.on('connect', function() {
      self.detailWindow = window.open(self.getFrontdoorUrl(), '_blank', [
        'location=no',
        'hidden=yes',
        'toolbar=yes',
        'transitionstyle=fliphorizontal',
        'closebuttoncaption=Close',
      ].join(','));
    });
  },

  show: function() {
    this.showRecord();
  },

  hide: function() {
    this.detailWindow.close();
  },

  openUrl: function(url) {
    var detailWindow = this.detailWindow;
    var hash = url.match(/#[0-9a-zA-Z\+\/\=]+$/);
    var code = hash ? [
      'if (location.pathname === "/one/one.app") {',
      '  location.hash = "' + hash[0] + '";',
      '} else {',
      '  location.replace("' + url + '");',
      '}'
    ].join('') :
      'location.replace("' + url + '");';
    detailWindow.executeScript({ code: code }, function() {
      detailWindow.show();
    });
  }

});
