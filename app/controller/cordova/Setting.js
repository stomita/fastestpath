/*global cordova */
Ext.define('FastestPath.controller.cordova.Setting', {
  extend: 'FastestPath.controller.Setting',
  doLogout: function() {
    var oauth = cordova.require('salesforce/plugin/oauth');
    oauth.logout();
    this.getSettingDialog().hide();
    Ext.Viewport.hide(true);
    setTimeout(function() {
      location.reload();
    }, 500);
  }
});