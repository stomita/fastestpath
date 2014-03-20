/*global jsforce, cordova*/
Ext.define('FastestPath.profile.Cordova', {
  extend: 'Ext.app.Profile',

  config: {
    name: 'Cordova',
    controllers: [
      'Setting'
    ],
    views: [
      'RecordDetailDialog'
    ]
  },

  isActive: function() {
    var isActive = typeof cordova !== 'undefined';
    console.log('Profile:cordova = ' + isActive);
    return isActive;
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
      jsforce.browser.connection = new jsforce.Connection({
        accessToken: creds.accessToken,
        instanceUrl: creds.instanceUrl,
        userInfo: {
          id: creds.userId,
          organizationId: creds.orgId
        },
        refreshFn: function(refreshToken, callback) {
          oauth.authenticate(function(creds) {
            callback(null, {
              access_token: creds.accessToken,
              instance_url: creds.instanceUrl,
              id: creds.loginUrl + '/id/' + creds.orgId + '/' + creds.userId
            });
          }, function(err) {
            callback(err);
          });
        }
      });
      jsforce.browser.emit('connect', jsforce.browser.connection);
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

    Ext.Viewport.add({
      xtype: 'cordovaRecordDetail',
      itemId: 'recordDetail',
      hidden: true,
      hideOnMaskTap: true
    });
  }
});