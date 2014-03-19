/*global jsforce*/
Ext.define('FastestPath.controller.Setting', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      clearCacheButton: {
        tap: 'clearCache'
      },
      logoutButton: {
        tap: 'doLogout'
      }
    },
    refs: {
      clearCacheButton: 'setting button#clearCache',
      logoutButton: 'setting button#logout'
    }
  },

  clearCache: function() {
    for (var i=0, len=localStorage.length; i<len; i++) {
      var key = localStorage.key(i);
      if (key && key.indexOf('resultcache') === 0) {
        localStorage.removeItem(key);
      }
    }
    Ext.Msg.alert('Cache Clear', 'Result cache has been cleared.');
  },

  doLogout: function() {
    jsforce.browser.logout();
    this.getSettingDialog().hide();
    window.location.reload();
  }
});