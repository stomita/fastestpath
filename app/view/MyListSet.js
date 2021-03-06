/*global jsforce */
Ext.define('FastestPath.view.MyListSet', {
  extend: 'Ext.Panel',
  xtype: 'myListSet',
  requires: [
    'Ext.carousel.Carousel',
    'FastestPath.store.MyListConfig',
    'FastestPath.store.Recent',
    'FastestPath.store.Report',
    'FastestPath.view.ReportList',
    'FastestPath.view.RecentList'
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
      itemId: 'myLists',
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
    this.addMyLists(records);
  },

  onMyListConfigLoad: function(store, records) {
    var lists = this.getComponent('myLists');
    var len = lists.getInnerItems().length;
    for (var i=0; i<len - 1; i++) {
      lists.removeInnerAt(i);
    }
    if (records.length === 0) {
      this.addRecentList();
    } else {
      this.addMyLists(records);
      lists.setActiveItem(0);
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

  addMyLists: function(records) {
    var me = this;
    records.forEach(function(record) {
      me.addMyList(record.getData());
    });
  },

  addMyList: function(config) {
    var listConfig;
    switch(config.type) {
      case 'report':
        listConfig = {
          xtype: 'reportList',
          itemId: config.id,
          title: config.title,
          store: {
            type: 'report',
            reportId: config.id
          },
          fetchDetails: config.fetchDetails,
          flattened: config.flattened
        };
        break;
      case 'recent':
        listConfig = {
          xtype: 'recentList',
          itemId: config.id,
          title: config.title,
          store: {
            type: 'recent'
          }
        };
        break;
      default:
        break;
    }
    var idx = this.getInnerItems().length - 1;
    idx = idx < 0 ? 0 : idx;
    var lists = this.getComponent('myLists');
    var p = lists.insert(idx, listConfig);
    lists.setActiveItem(p);
  },

  slideToNext: function() {
    this.getComponent('myLists').next();
  },

  slideToPrevious: function() {
    this.getComponent('myLists').previous();
  },

});
