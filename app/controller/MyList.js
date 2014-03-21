/*global jsforce, cordova*/
Ext.define('FastestPath.controller.MyList', {
  extend: 'Ext.app.Controller',
  requires: [
    'Ext.ActionSheet'
  ],
  config: {
    control: {
      myListEntriesPanel: {
        activeitemchange: 'checkNavButton'
      },
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
      myListEntriesPanel: 'myList #myListEntries',
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
    var myListEntries = this.getMyListEntriesPanel();
    var myListEntry = myListEntries.getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var idx = store.find('id', myListEntry.getItemId());
    var rec = store.getAt(idx);
    store.remove(rec);
    rec.erase();
    store.sync();
    this.getEntrySettingSheet().hide();
    myListEntry.hide({ type: 'slideOut', direction: 'up' });
    var self = this;
    setTimeout(function() {
      var idx = myListEntries.getActiveIndex();
      myListEntries.setActiveItem(idx > 0 ? idx-1 : 0);
      myListEntries.remove(myListEntry, true);
      self.checkNavButton();
    }, 500);
  },

  slideToNext: function() {
    this.getMyListPanel().slideToNext();
  },

  slideToPrev: function() {
    this.getMyListPanel().slideToPrevious();
  },

  checkNavButton: function() {
    console.log('checkNavButton');
    var myListEntries = this.getMyListEntriesPanel();
    var activeIndex = myListEntries.getActiveIndex();
    var prevButton = this.getPrevButton();
    var nextButton = this.getNextButton();
    prevButton.show();
    nextButton.show();
    if (activeIndex === 0) {
      prevButton.hide();
    }
    if (activeIndex === myListEntries.getInnerItems().length - 1) {
      nextButton.hide();
    }
  }

});