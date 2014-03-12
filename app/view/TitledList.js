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

  constructor: function() {
    this.callParent(arguments);
    var titlebar = this.getComponent('titlebar');
    titlebar.on('painted', 'onTitlePainted', this);
  },

  setTitle: function(title) {
    this.getComponent('titlebar').setTitle(title);
  },

  setTitleItems: function(items) {
    this.getComponent('titlebar').add(items);
  },

  getTitle: function() {
    var titlebar = this.getComponent('titlebar');
    return titlebar.getTitle();
  },

  setStore: function(store) {
    this.getComponent('recordList').setStore(store);
  },

  getStore: function() {
    return this.getComponent('recordList').getStore();
  },

  onTitlePainted: function(el) {
    el.on('tap', 'onTitleTap', this);
  },

  onTitleTap: function() {
    this.getComponent('recordList').scrollToTop();
  }

});