/*global jsforce, cordova*/
Ext.define('FastestPath.controller.MyList', {
  extend: 'Ext.app.Controller',
  requires: [
    'Ext.ActionSheet'
  ],
  config: {
    control: {
      addRecentButton: {
        tap: 'addRecentList'
      },
      addReportButton: {
        tap: 'showReportSearchDialog'
      },
      reportSearchDialog: {
        select: 'selectReport'
      },
      settingButton: {
        tap: 'showMyListEntrySetting'
      },
      entryDeleteButton: {
        tap: 'deleteMyListEntry'
      },
      prevButton: {
        tap: 'slideToPrev'
      },
      nextButton: {
        tap: 'slideToNext'
      }
    },
    refs: {
      myListPanel: 'myList',
      reportSearchDialog: 'reportSearchDialog',
      entrySettingSheet: '#entrySetting',
      entryDeleteButton: '#entrySetting button#deleteButton',
      addRecentButton: 'myList button#addRecentButton',
      addReportButton: 'myList button#addReportButton',
      settingButton: 'myList myListEntry button#settingButton',
      prevButton: 'myList button#prevButton',
      nextButton: 'myList button#nextButton'
    }
  },

  launch: function() {
    Ext.Viewport.add({
      xtype: 'actionsheet',
      itemId: 'entrySetting',
      hidden: true,
      items: [{
        text: 'Delete',
        itemId: 'deleteButton',
        ui  : 'decline'
      }],
      hideOnMaskTap: true
    });
  },

  addRecentList: function() {
    this.getMyListPanel().addRecentList();
  },

  showReportSearchDialog: function() {
    this.getReportSearchDialog().show();
  },

  selectReport: function(report) {
    this.getReportSearchDialog().hide();
    report = report.getData();
    var store = Ext.StoreManager.lookup('myListConfig');
    var listConfigRecord = Ext.create('FastestPath.model.ListConfig', {
      id: report.id,
      type: 'report',
      title: report.title
    });
    listConfigRecord.phantom = true;
    store.add(listConfigRecord);
    store.sync();
  },

  showMyListEntrySetting: function() {
    this.getEntrySettingSheet().show();
  },

  deleteMyListEntry: function() {
    var myList = this.getMyListPanel();
    var myListEntry = myList.getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var idx = store.find('id', myListEntry.getItemId());
    var rec = store.getAt(idx);
    store.remove(rec);
    rec.erase();
    store.sync();
    this.getEntrySettingSheet().hide();
    myListEntry.hide({ type: 'slideOut', direction: 'up' });
    setTimeout(function() {
      var idx = myList.getActiveIndex();
      myList.setActiveItem(idx > 0 ? idx-1 : 0);
      myList.remove(myListEntry, true);
    }, 500);
  },

  slideToNext: function() {
    this.getMyListPanel().next();
  },

  slideToPrev: function() {
    this.getMyListPanel().previous();
  }

});