/*global jsforce, cordova*/
Ext.define('FastestPath.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      recordListPanel: {
        scrolldown: 'onListScrollDown',
        scrollup: 'onListScrollUp'
      },
      settingButton: {
        tap: 'showSetting'
      }
    },
    refs: {
      mainPanel: 'main',
      recordListPanel: 'main recordList',
      settingDialog: 'setting',
    }
  },

  showSetting: function() {
    this.getSettingDialog().show();
  },

  onListScrollDown: function() {
    var mainTabBar = this.getMainPanel().getTabBar();
    mainTabBar.hide({ type: 'slideOut', direction: 'down' });
  },

  onListScrollUp: function() {
    var mainTabBar = this.getMainPanel().getTabBar();
    mainTabBar.show({ type: 'slide', direction: 'up' });
  }

});