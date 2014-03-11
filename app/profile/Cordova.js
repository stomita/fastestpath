/*global jsforce, cordova*/
Ext.define('FastestPath.profile.Cordova', {
  extend: 'Ext.app.Profile',

  config: {
    name: 'Cordova',
    controllers: [
      'Records',
      'Setting'
    ]
  },

  isActive: function() {
    return typeof cordova !== 'undefined';
  },

  launch: function() {
    var app = this.getApplication();
    var oauth = cordova.require('salesforce/plugin/oauth');
    oauth.getAuthCredentials(function(creds) {
      jsforce.browser.connection = new jsforce.Connection(creds);
      app.fireEvent('profilelaunch');
    });
  }
});