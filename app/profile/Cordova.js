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
    var self = this;
    var app = this.getApplication();
    var oauth = cordova.require('salesforce/plugin/oauth');

    console.log(" **** get auth creds ****");
    oauth.getAuthCredentials(function(creds) {
      console.log(" ----- cred fetched. ------");
      if (!creds) {
        console.log(" **** no auth creds. authenticate ****");
        setTimeout(authenticate, 10);
        return;
      }
      jsforce.browser.connection = new jsforce.Connection(creds);
      app.fireEvent('profilelaunch');
    });
    app.on('connectionerror', authenticate);

    function authenticate() {
      console.log(" *** auth start ****");
      oauth.authenticate(function() {
        console.log(" ===== auth done. reload =====");
        location.reload();
      });
    }
  }
});