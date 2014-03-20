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
    console.log(detailWindow);
    var hash = url.match(/#[0-9a-zA-Z\+\/\=]+$/);
    var code = hash ? 'location.hash = "' + hash[0] + '";' : 'location.replace("' + url + '");';
    detailWindow.executeScript({ code: code }, function() {
      detailWindow.show();
    });
  }

});
