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
      addRecentButton: 'myList button#addRecentButton',
      addReportButton: 'myList button#addReportButton',
      prevButton: 'myList button#prevButton',
      nextButton: 'myList button#nextButton'
    }
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

  slideToNext: function() {
    this.getMyListPanel().slideToNext();
  },

  slideToPrev: function() {
    this.getMyListPanel().slideToPrevious();
  },

  checkNavButton: function() {
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