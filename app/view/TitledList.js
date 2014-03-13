Ext.define('FastestPath.view.TitledList', {
  extend: 'Ext.Panel',
  requires: [
    'Ext.TitleBar',
    'FastestPath.view.RecordList'
  ],
  xtype: 'titledList',
  config: {
    layout: 'fit',
    title: null,
    store: null,
    titleItems: null,
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      itemId: 'titlebar'
    }, {
      xtype: 'recordList',
      itemId: 'recordList'
    }]
  },

  initialize: function() {
    this.callParent(arguments);
    var titlebar = this.getComponent('titlebar');
    titlebar.element.on('tap', 'onTitleTap', this);
  },

  applyTitle: function(title) {
    this.getComponent('titlebar').setTitle(title);
  },

  applyTitleItems: function(items) {
    this.getComponent('titlebar').add(items);
  },

  getTitle: function() {
    var titlebar = this.getComponent('titlebar');
    return titlebar.getTitle();
  },

  applyStore: function(store) {
    this.getComponent('recordList').setStore(store);
  },

  getStore: function() {
    return this.getComponent('recordList').getStore();
  },

  onTitleTap: function() {
    this.getComponent('recordList').scrollToTop();
  }

});