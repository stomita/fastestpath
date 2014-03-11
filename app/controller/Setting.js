/*global jsforce*/
Ext.define('FastestPath.controller.Setting', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      logoutButton: {
        tap: 'doLogout'
      }
    },
    refs: {
      mainPanel: 'main',
      settingDialog: 'setting',
      logoutButton: 'setting button[itemId=logout]'
    }
  },

  doLogout: function() {
    jsforce.browser.logout();
    this.getSettingDialog().hide();
    window.location.reload();
  }
});