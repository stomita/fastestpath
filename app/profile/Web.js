/*global jsforce */
Ext.define('FastestPath.profile.Web', {
  extend: 'Ext.app.Profile',

  config: {
    name: 'Web',
    controllers: [
      'FastestPath.controller.Records',
      'FastestPath.controller.Setting'
    ]
  },

  isActive: function() {
    return typeof cordova === 'undefined';
  },

  launch: function() {
    var app = this.getApplication();
    jsforce.browser.init({
      clientId: '3MVG9I1kFE5Iul2D_CnNFEpYNxtjSuClAFeKaIA3veILM1b02gF8G9QUCEEDOHeMT643zoeEiZ1QaLgg9.NW8',
      redirectUri: 'http://localhost:1841/',
      proxyUrl: 'https://node-salesforce-proxy.herokuapp.com/proxy'
    });
    var launch = function() {
      var conn = jsforce.browser.connection;
      conn.identity(function(err, res) {
        if (err) {
          app.fireEvent('connectionerror', err);
        } else {
          app.fireEvent('profilelaunch');
        }
      });
    };
    if (jsforce.browser.isLoggedIn()) {
      launch();
    } else {
      Ext.Msg.confirm("Login", "Connect to Salesforce", function(btn) {
        if (btn === "yes") {
          jsforce.browser.login();
          jsforce.browser.on('connect', launch);
        } else {
          location.reload();
        }
      });
    }
    app.on('connectionerror', function() {
      jsforce.browser.logout();
      location.reload();
    });
  }
});