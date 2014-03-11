/*global jsforce, cordova*/
Ext.define('FastestPath.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      settingButton: {
        tap: 'showSetting'
      }
    },
    refs: {
      settingDialog: 'setting'
    }
  },

  showSetting: function() {
    this.getSettingDialog().show();
  }

});