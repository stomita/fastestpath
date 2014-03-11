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
      settingDialog: 'setting',
      settingButton: 'button[itemId=setting]'
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
        mainPanel.addReportLists(records);
      }).then(null, function(err) {
        console.error(err.message, err.stack);
      });
  },

  showSetting: function() {
    this.getSettingDialog().show();
  }

});