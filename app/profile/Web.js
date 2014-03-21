/*global jsforce */
Ext.define('FastestPath.profile.Web', {
  extend: 'Ext.app.Profile',

  statics: {
    jsforceConfig:
      location.host === 'localhost:1841' ? {
        clientId: '3MVG9I1kFE5Iul2D_CnNFEpYNxtjSuClAFeKaIA3veILM1b02gF8G9QUCEEDOHeMT643zoeEiZ1QaLgg9.NW8',
        redirectUri: 'http://localhost:1841/',
        proxyUrl: 'https://node-salesforce-proxy.herokuapp.com/proxy'
      } :
      location.host === 'fastestpath-for-saleforce.herokuapp.com' ? {
        clientId: '3MVG9I1kFE5Iul2D_CnNFEpYNxgG3_.RT1vX0ycHw1lqt72iTdRm2h6IqzDmBV51kIze5P21WfIEw9On6O18H',
        redirectUri: 'https://fastestpath-for-salesforce.herokuapp.com/',
        proxyUrl: 'https://node-salesforce-proxy.herokuapp.com/proxy'
      } : null
  },

  config: {
    name: 'Web',
    controllers: [
      'FastestPath.controller.Setting'
    ]
  },

  isActive: function() {
    var isActive = typeof cordova === 'undefined';
    console.log('Profile:web = ' + isActive);
    return isActive;
  },

  launch: function() {
    var app = this.getApplication();
    jsforce.browser.init(this.statics().jsforceConfig);

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
  
    Ext.Viewport.add({
      xtype: 'recordDetail',
      itemId: 'recordDetail',
      hidden: true,
      hideOnMaskTap: true
    });
  }
});