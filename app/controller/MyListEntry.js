/*global jsforce, cordova*/
Ext.define('FastestPath.controller.MyListEntry', {
  extend: 'Ext.app.Controller',
  requires: [
    'Ext.ActionSheet'
  ],
  config: {
    control: {
      settingButton: {
        tap: 'showSetting'
      },
      fetchDetailsButton: {
        tap: 'enableFetchDetails'
      },
      nofetchDetailsButton: {
        tap: 'disableFetchDetails'
      },
      entryDeleteButton: {
        tap: 'deleteMyListEntry'
      }
    },
    refs: {
      myListPanel: 'myList',
      myListEntriesPanel: 'myList #myListEntries',
      settingButton: 'myList myListEntry button#settingButton',
      reportListSettingSheet: '#reportListSetting',
      recentListSettingSheet: '#recentListSetting',
      fetchDetailsButton: 'actionsheet button#fetchDetailsButton',
      nofetchDetailsButton: 'actionsheet button#nofetchDetailsButton',
      entryDeleteButton: 'actionsheet button#deleteButton'
    }
  },

  launch: function() {
    Ext.Viewport.add({
      xtype: 'actionsheet',
      itemId: 'reportListSetting',
      hidden: true,
      items: [{
        text: 'Fetch Detail Records',
        itemId: 'fetchDetailsButton'
      }, {
        text: 'Don\'t Fetch Details',
        itemId: 'nofetchDetailsButton'
      }, {
        text: 'Delete',
        itemId: 'deleteButton',
        ui  : 'decline'
      }],
      hideOnMaskTap: true
    });
    Ext.Viewport.add({
      xtype: 'actionsheet',
      itemId: 'recentListSetting',
      hidden: true,
      items: [{
        text: 'Delete',
        itemId: 'deleteButton',
        ui  : 'decline'
      }],
      hideOnMaskTap: true
    });
  },

  getCurrentListConfig: function() {
    var myListEntries = this.getMyListEntriesPanel();
    var myListEntry = myListEntries.getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var idx = store.find('id', myListEntry.getItemId());
    return store.getAt(idx);
  },

  showSetting: function() {
    var config = this.getCurrentListConfig().getData();
    if (config.type === 'report') {
      this.showReportListSetting(config);
    } else {
      this.showRecentListSetting(config);
    }
  },

  showRecentListSetting: function() {
    var sheet = this.getRecentListSettingSheet();
    sheet.show();
  },

  showReportListSetting: function(config) {
    var sheet = this.getReportListSettingSheet();
    console.log(config);
    if (config.fetchDetails === false) {
      sheet.getComponent('fetchDetailsButton').show();
      sheet.getComponent('nofetchDetailsButton').hide();
    } else {
      sheet.getComponent('fetchDetailsButton').hide();
      sheet.getComponent('nofetchDetailsButton').show();
    }
    sheet.show();
  },

  deleteMyListEntry: function() {
    var myListEntries = this.getMyListEntriesPanel();
    var myListEntry = myListEntries.getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var idx = store.find('id', myListEntry.getItemId());
    var rec = store.getAt(idx);
    store.remove(rec);
    rec.erase();
    store.sync();
    this.getReportListSettingSheet().hide();
    this.getRecentListSettingSheet().hide();
    myListEntry.hide({ type: 'slideOut', direction: 'up' });
    var self = this;
    setTimeout(function() {
      var idx = myListEntries.getActiveIndex();
      myListEntries.setActiveItem(idx > 0 ? idx-1 : 0);
      myListEntries.remove(myListEntry, true);
      // .checkNavButton();
    }, 500);
  },

  enableFetchDetails: function() {
    this.setFetchDetails(true);
  },

  disableFetchDetails: function() {
    this.setFetchDetails(false);
  },

  setFetchDetails: function(fetchDetails) {
    var myListEntries = this.getMyListEntriesPanel();
    var myListEntry = myListEntries.getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var rec = this.getCurrentListConfig();
    rec.set('fetchDetails', fetchDetails);
    store.sync();
    var listStore = myListEntry.getStore();
    var eparams = listStore.getProxy().getExtraParams();
    eparams.fetchDetails = fetchDetails;
    listStore.getProxy().setExtraParams(eparams);
    listStore.load({ params: { refresh: true } });
    this.getReportListSettingSheet().hide();
  }

});