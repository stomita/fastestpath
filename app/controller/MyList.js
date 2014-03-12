/*global jsforce, cordova*/
Ext.define('FastestPath.controller.MyList', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
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
      entrySettingSheet: {
        selector: '#entrySetting',
        xtype: 'actionsheet',
        itemId: 'entrySetting',
        items: [{
          text: 'Delete',
          itemId: 'deleteButton',
          ui  : 'decline'
        }],
        hideOnMaskTap: true,
        autoCreate: true        
      },
      entryDeleteButton: '#entrySetting button#deleteButton',
      addReportButton: 'myList button#addReportButton',
      settingButton: 'myList myListEntry button#settingButton',
      prevButton: 'myList myListEntry button#prevButton',
      nextButton: 'myList myListEntry button#nextButton'
    }
  },

  showReportSearchDialog: function() {
    this.getReportSearchDialog().show();
  },

  selectReport: function(report) {
    this.getReportSearchDialog().hide();
    report = report.getData();
    var store = Ext.StoreManager.lookup('myListConfig');
    var listConfigRecord = Ext.create('FastestPath.model.ListConfig', {
      id: report.Id,
      type: 'report',
      title: report.Name
    });
    listConfigRecord.phantom = true;
    store.add(listConfigRecord);
    store.sync();
  },

  showMyListEntrySetting: function() {
    this.getEntrySettingSheet().show();
  },

  deleteMyListEntry: function() {
    var myListEntry = this.getMyListPanel().getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var idx = store.find('id', myListEntry.getItemId());
    var rec = store.getAt(idx);
    store.remove(rec);
    rec.erase();
    store.sync();
    this.getEntrySettingSheet().hide();
    this.getMyListPanel().remove(myListEntry);
  },

  slideToNext: function() {
    this.getMyListPanel().next();
  },

  slideToPrev: function() {
    this.getMyListPanel().previous();
  }

});