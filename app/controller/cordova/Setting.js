/*global cordova */
Ext.define('FastestPath.controller.cordova.Setting', {
  extend: 'FastestPath.controller.Setting',
  doLogout: function() {
    var oauth = cordova.require('salesforce/plugin/oauth');
    oauth.logout();
    oauth.authenticate(function() {
      location.reload();
    });
    this.getSettingDialog().hide();
    Ext.Viewport.hide(true);
  }
});