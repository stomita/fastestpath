Ext.define('FastestPath.view.NavigationList', {
  extend: 'Ext.navigation.View',
  requires: [
    'FastestPath.view.RecordList'
  ],
  xtype: 'navList',
  config: {
    title: null,
    store: null,
    titleItems: null,
    items: [{
      itemId: 'firstPanel',
      title: null,
      layout: 'fit',
      items: [{
        xtype: 'recordList',
        itemId: 'recordList'
      }]
    }],
    listeners: {

    }
  },

  initialize: function() {
    this.callParent(arguments);
    var navbar = this.getNavigationBar();
    navbar.element.on('tap', 'onTitleTap', this);
    this.on('pop', function(navList, view) {
      if (navList.getActiveItem().getItemId() === 'firstPanel') {
        navList.setTitle(navList.initialConfig.title);
      }
    });
  },

  applyTitle: function(title) {
    console.log('title', title);
    this.getNavigationBar().setTitle(title);
  },

  applyTitleItems: function(items) {
    var navbar = this.getNavigationBar();
    navbar.add(items);
  },

  applyStore: function(store) {
    this.query('#recordList')[0].setStore(store);
  },

  getStore: function() {
    return this.query('#recordList')[0].getStore();
  },

  onTitleTap: function() {
    this.query('recordList').forEach(function(list) {
      list.scrollToTop();
    });
  }

});