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
    }]
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
    this.getNavigationBar().setTitle(title);
    return title;
  },

  applyTitleItems: function(items) {
    var navbar = this.getNavigationBar();
    navbar.add(items);
  },

  applyStore: function(store) {
    return this.down('#recordList').setStore(store);
  },

  getStore: function() {
    return this.down('#recordList').getStore();
  },

  onTitleTap: function() {
    this.query('recordList').forEach(function(list) {
      list.scrollToTop();
    });
  }

});