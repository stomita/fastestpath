/*global jsforce, cordova*/
Ext.define('FastestPath.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    opened: false,
    control: {
      settingButton: {
        tap: 'showSetting'
      },
      loginButton: {
        tap: 'doLogin'
      },
      logoutButton: {
        tap: 'doLogout'
      },
      reportListPanel: {
        itemtap: 'doTapRecord'
      }
    },
    refs: {
      mainPanel: 'main',
      reportListPanel: 'main reportList',
      settingButton: 'button[itemId=setting]',
      loginButton: 'button[itemId=login]',
      logoutButton: 'button[itemId=logout]'
    }
  },

  launch: function() {
    var me = this;
    if (typeof cordova !== 'undefined') {
      var oauth = cordova.require('salesforce/plugin/oauth');
      oauth.getAuthCredentials(function(creds) {
        jsforce.browser.connection = new jsforce.Connection(creds);
        me.startup();
      });
    } else {
      jsforce.browser.init({
        clientId: '3MVG9I1kFE5Iul2D_CnNFEpYNxtjSuClAFeKaIA3veILM1b02gF8G9QUCEEDOHeMT643zoeEiZ1QaLgg9.NW8',
        redirectUri: 'http://localhost:1841/',
        proxyUrl: 'https://node-salesforce-proxy.herokuapp.com/proxy'
      });
      if (jsforce.browser.isLoggedIn()) {
        me.startup();
      } else {
        Ext.Msg.confirm("Login", "Connect to Salesforce", function(btn) {
          if (btn === "yes") {
            jsforce.browser.login();
            jsforce.browser.on('connect', function(conn) {
              me._startup();
            });
          }
        });
      }
    }
  },

  startup: function() {
    var mainPanel = this.getMainPanel();
    var conn = jsforce.browser.connection;
    conn.sobject('Report')
      .find({ DeveloperName: { $like: 'FP%' } }, 'Id, Name')
      .orderby('DeveloperName')
      .limit(5)
      .execute(function(err, records) {
        var panels = records.map(function(rec, i) {
          return {
            title: rec.Name,
            iconCls: ([ 'home', 'bookmarks', 'favorites', 'time', 'info' ])[i % 5],
            layout: 'fit',
            items: {
              xtype: 'reportList',
              title: rec.Name,
              reportId: rec.Id
            }
          };
        });
        mainPanel.add(panels);
      }).then(null, function(err) {
        console.error(err.message, err.stack);
      });
  },

  showSetting: function() {
    alert('setting');
  },

  doLogin: function() {
    alert('Login');
  },

  doLogout: function() {
    alert('Logout');
  },

  doTapRecord: function(me, index, target, record, e) {
    var hash = btoa(JSON.stringify({
      componentDef: 'force:recordHome',
      attributes: {
        values: {
          recordId: record.get('Id')
        }
      }
    }));
    var url, redirectPath = '/one/one.app#' + encodeURIComponent(hash);
    var conn = jsforce.browser.connection;
    if (!this.getOpened()) {
      redirectPath = "/secur/frontdoor.jsp?sid=" + conn.accessToken + "&retURL=" + encodeURIComponent(redirectPath);
    }
    url = jsforce.browser.connection.instanceUrl + redirectPath;
    this.setOpened(true);
    window.open(url, 's1win');
  }

});