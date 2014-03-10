/*global jsforce, cordova*/
Ext.define('FastestPath.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      settingButton: {
        tap: 'showSetting'
      },
      loginButton: {
        tap: 'doLogin'
      },
      logoutButton: {
        tap: 'doLogout'
      }
    },
    refs: {
      mainPanel: 'main',
      settingButton: 'button[itemId=setting]',
      loginButton: 'button[itemId=login]',
      logoutButton: 'button[itemId=logout]'
    }
  },

  launch: function() {
    this.callParent(arguments);
    var app = this.getApplication();
    app.on('startup', this.startup, this);
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
  }

});