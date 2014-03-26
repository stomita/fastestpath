/*global jsforce, cordova*/
Ext.define('FastestPath.controller.MyList', {
  extend: 'Ext.app.Controller',
  requires: [
    'FastestPath.view.ReportListSettingDialog',
    'FastestPath.view.RecentListSettingDialog'
  ],
  config: {
    control: {
      settingButton: {
        tap: 'showMyListSettingDialog'
      }
    },
    refs: {
      myListsPanel: 'myListSet #myLists',
      settingButton: 'myListSet myList button#settingButton',
      reportListSettingDialog: '#reportListSetting',
      recentListSettingDialog: '#recentListSetting'
    }
  },

  getCurrentListConfig: function() {
    var myLists = this.getMyListsPanel();
    var myList = myLists.getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var idx = store.find('id', myList.getItemId());
    return store.getAt(idx);
  },

  showMyListSettingDialog: function() {
    var config = JSON.parse(JSON.stringify(this.getCurrentListConfig().getData()));
    var dialog = config.type === 'report' ?
      this.getReportListSettingDialog() :
      this.getRecentListSettingDialog();
    dialog.setSetting(config);
    dialog.show();
  }

});