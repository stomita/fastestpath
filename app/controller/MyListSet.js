/*global jsforce, cordova*/
Ext.define('FastestPath.controller.MyListSet', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      myListsPanel: {
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
      myListSetPanel: 'myListSet',
      myListsPanel: 'myListSet #myLists',
      reportSearchDialog: 'reportSearchDialog',
      addRecentButton: 'myListSet button#addRecentButton',
      addReportButton: 'myListSet button#addReportButton',
      prevButton: 'myListSet button#prevButton',
      nextButton: 'myListSet button#nextButton'
    }
  },

  addRecentList: function() {
    this.getMyListSetPanel().addRecentList();
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
    this.getMyListSetPanel().slideToNext();
  },

  slideToPrev: function() {
    this.getMyListSetPanel().slideToPrevious();
  },

  checkNavButton: function() {
    var myLists = this.getMyListsPanel();
    var activeIndex = myLists.getActiveIndex();
    var prevButton = this.getPrevButton();
    var nextButton = this.getNextButton();
    prevButton.show();
    nextButton.show();
    if (activeIndex === 0) {
      prevButton.hide();
    }
    if (activeIndex === myLists.getInnerItems().length - 1) {
      nextButton.hide();
    }
  }

});