/*global jsforce */
Ext.define('FastestPath.view.MyList', {
  extend: 'Ext.Carousel',
  xtype: 'myList',
  requires: [
    'FastestPath.store.MyListConfig',
    'FastestPath.store.Recent',
    'FastestPath.store.Report',
    'FastestPath.view.MyListEntry'
  ],

  config: {
    layout: 'fit',
    items: [{
      itemId: 'addMyList',
      layout: 'fit',
      items: [{
        xtype: 'titlebar',
        title: 'Add New List',
        docked: 'top',

      }, {
        centered: true,
        items: {
          xtype: 'button',
          itemId: 'addReportButton',
          iconCls: 'add',
          text: 'Add New Report List'
        }
      }]
    }],
    listeners: {
      activeitemchange: function() {
        // console.log(arguments);
      }
    }
  },

  constructor: function() {
    this.callParent(arguments);
    var store = Ext.StoreManager.lookup('myListConfig');
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
    var len = this.getInnerItems().length;
    for (var i=0; i<len - 1; i++) {
      this.removeInnerAt(i);
    }
    if (records.length === 0) {
      var listConfigRecord = Ext.create('FastestPath.model.ListConfig', {
        id: 'recent',
        type: 'recent',
        title: 'Recently Accessed',
      });
      listConfigRecord.phantom = true;
      store.add(listConfigRecord);
      store.sync();
      return;
    }
    this.addMyListEntries(records);
    this.setActiveItem(0);
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
    var p = this.insert(idx, {
      xtype: 'myListEntry',
      itemId: config.id,
      title: config.title,
      store: store
    });
    this.setActiveItem(p);
  }

});
