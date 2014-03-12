/*global jsforce, cordova*/
Ext.define('FastestPath.controller.MyList', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      myListPanel: {
        swipe: 'onSwipe'
      },
      prevListButton: {
        tap: 'slideToPrevList'
      },
      nextListButton: {
        tap: 'slideToNextList'
      }
    },
    refs: {
      myListPanel: 'myList',
      prevListButton: 'myList recordList button[itemId=prev]',
      nextListButton: 'myList recordList button[itemId=next]',
      settingDialog: 'setting',
      settingButton: 'button[itemId=setting]'
    }
  },

  launch: function() {
    this.callParent(arguments);
    var app = this.getApplication();
    app.on('startup', this.startup, this);
  },

  startup: function() {
    var app = this.getApplication();
    var myListPanel = this.getMyListPanel();
    var conn = jsforce.browser.connection;
    conn.sobject('Report')
      .find({ DeveloperName: { $like: 'FP%' } }, 'Id, Name')
      .orderby('DeveloperName')
      .limit(5)
      .then(function(records) {
        records.forEach(function(record) {
          myListPanel.addReportList(record);
        });
      }).then(null, function(err) {
        console.error(err.message, err.stack);
        app.fireEvent('connectionerror', err);
      });
  },

  slideToPrevList: function() {
    this.getMyListPanel().slideToPrevList();
  },

  slideToNextList: function() {
    this.getMyListPanel().slideToNextList();
  }

});