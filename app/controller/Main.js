/*global jsforce, cordova*/
Ext.define('FastestPath.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      recordListPanel: {
        exception: 'handleException'
      },
      settingButton: {
        tap: 'showSetting'
      },
      myListEntryPanel: {
        scrolldown: 'onListScrollDown',
        scrollup: 'onListScrollUp'
      }
    },
    refs: {
      recordListPanel: 'recordList',
      mainPanel: 'main',
      myListEntryPanel: 'main myListEntry',
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
  },

  handleException: function(e) {
    var app = this.getApplication();
    Ext.Msg.alert("Error", e, function() {
      if (/^Session/.test(e)) {
        app.fireEvent('connectionerror', e);
      }
    });
  }

});
