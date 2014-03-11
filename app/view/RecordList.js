Ext.define('FastestPath.view.RecordList', {
  extend: 'Ext.dataview.List',
  xtype: 'recordList',
  requires: [
    'Ext.plugin.PullRefresh'
  ],
  config: {
    xtype: 'list',
    loadingText: 'Loading...',
    plugins: [{
      xclass: 'Ext.plugin.PullRefresh'
    }],
    itemTpl: '{Name}'
  },

  constructor: function(config) {
    this.callParent(arguments);
    this.add({
      xtype: 'titlebar',
      docked: 'top',
      title: config.title,
      items: [{
        align: 'right',
        itemId: 'setting',
        iconCls: 'settings'
      }]
    });
    var scroller = this.getScrollable().getScroller();
    scroller.on({
      scrollend: this.onScrollEnd,
      scope: this
    });
  },
  onScrollEnd: function() {
    var list = this;
    var pullPlugin = this.getPlugins()[0];
    if (pullPlugin.getState() === "loading") {
      list.getStore().removeAll(true);
    }
  }
});
