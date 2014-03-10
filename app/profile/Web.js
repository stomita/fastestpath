/*global jsforce */
Ext.define('FastestPath.profile.Web', {
  extend: 'Ext.app.Profile',

  config: {
    name: 'Web',
    controllers: [
      'FastestPath.controller.Records'
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
    if (jsforce.browser.isLoggedIn()) {
      setTimeout(function() {
        app.fireEvent('profilelaunch');
      }, 0);
    } else {
      Ext.Msg.confirm("Login", "Connect to Salesforce", function(btn) {
        if (btn === "yes") {
          jsforce.browser.login();
          jsforce.browser.on('connect', function(conn) {
            app.fireEvent('profielaunch');
          });
        }
      });
    }
  }
});