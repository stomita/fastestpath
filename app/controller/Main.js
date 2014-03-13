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
      },
      listPanel: {
        exception: 'handleException'
      }
    },
    refs: {
      listPanel: 'titledList',
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
  },

  handleException: function(e) {
    var app = this.getApplication();
    Ext.Msg.alert("Error", e, function() {
      app.fireEvent('connectionerror', e);
    });
  }

});
