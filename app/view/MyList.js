/*global jsforce */
Ext.define('FastestPath.view.MyList', {
  extend: 'Ext.Panel',
  xtype: 'myList',
  requires: [
    'Ext.carousel.Carousel',
    'FastestPath.store.MyListConfig',
    'FastestPath.store.Recent',
    'FastestPath.store.Report',
    'FastestPath.view.MyListEntry'
  ],

  config: {
    layout: 'fit',
    items: [{
      xtype: 'button',
      itemId: 'prevButton',
      docked: 'bottom',
      width: 50,
      height: 70,
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        background: 'transparent',
        border: 0,
        opacity: 0.5,
        fontSize: '3em'
      },
      text: '<span class="fa fa-caret-left"></span>'
    }, {
      xtype: 'button',
      itemId: 'nextButton',
      docked: 'bottom',
      width: 50,
      height: 70,
      style: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        background: 'transparent',
        border: 0,
        opacity: 0.5,
        fontSize: '3em'
      },
      text: '<span class="fa fa-caret-right"></span>'
    }, {
      xtype: 'carousel',
      itemId: 'myListEntries',
      directionLock: true,
      layout: 'fit',
      items: [{
        itemId: 'addMyList',
        layout: 'fit',
        items: [{
          xtype: 'titlebar',
          title: 'Add New List',
          docked: 'top'
        }, {
          centered: true,
          items: [{
            xtype: 'button',
            itemId: 'addRecentButton',
            iconCls: 'add',
            text: 'Add Recent Items List'
          }, {
            xtype: 'spacer',
            height: 50
          }, {
            xtype: 'button',
            itemId: 'addReportButton',
            iconCls: 'add',
            text: 'Add New Report List'
          }]
        }]
      }]
    }]
  },

  initialize: function() {
    this.callParent(arguments);
    var store = Ext.StoreManager.lookup('myListConfig');
    var uid = jsforce.browser.connection.userInfo.id;
    store.getProxy().setId(store.getProxy().getId() + '_' + uid);
    store.on({
      load: 'onMyListConfigLoad',
      addrecords: 'onMyListConfigAdd',
      scope: this
    });
    store.load();
  },

  onMyListConfigAdd: function(store, records) {
    this.addMyListEntries(records);
  },

  onMyListConfigLoad: function(store, records) {
    var listEntries = this.getComponent('myListEntries');
    var len = listEntries.getInnerItems().length;
    for (var i=0; i<len - 1; i++) {
      listEntries.removeInnerAt(i);
    }
    if (records.length === 0) {
      this.addRecentList();
    } else {
      this.addMyListEntries(records);
      listEntries.setActiveItem(0);
    }
  },

  addRecentList: function() {
    var store = Ext.StoreManager.lookup('myListConfig');
    var listConfigRecord = Ext.create('FastestPath.model.ListConfig', {
      id: 'recent',
      type: 'recent',
      title: 'Recently Accessed',
    });
    listConfigRecord.phantom = true;
    store.add(listConfigRecord);
    store.sync();
  },

  addMyListEntries: function(records) {
    var me = this;
    records.forEach(function(record) {
      me.addMyListEntry(record.getData());
    });
  },

  addMyListEntry: function(config) {
    var store;
    switch(config.type) {
      case 'report':
        store = { type: 'report', reportId: config.id };
        break;
      case 'recent':
        store = { type: 'recent' };
        break;
      default:
        break;
    }
    if (store) {
      store.autoload = true;
    }
    var idx = this.getInnerItems().length - 1;
    idx = idx < 0 ? 0 : idx;
    var listEntries = this.getComponent('myListEntries');
    var p = listEntries.insert(idx, {
      xtype: 'myListEntry',
      itemId: config.id,
      title: config.title,
      store: store
    });
    listEntries.setActiveItem(p);
  },

  slideToNext: function() {
    this.getComponent('myListEntries').next();
  },

  slideToPrevious: function() {
    this.getComponent('myListEntries').previous();
  },

});
