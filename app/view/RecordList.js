Ext.define('FastestPath.view.RecordList', {
  extend: 'Ext.dataview.List',
  xtype: 'recordList',
  requires: [
    'Ext.plugin.PullRefresh'
  ],
  config: {
    loadingText: 'Loading...',
    emptyText: 'No items available.',
    plugins: [{
      xclass: 'Ext.plugin.PullRefresh'
    }],
    itemTpl: '{Name}',
  },

  constructor: function(config) {
    this.callParent(arguments);
    var scroller = this.getScrollable().getScroller();
    scroller.on('scrollstart', 'onScrollStart', this);
    scroller.on('scrollend', 'onScrollEnd', this);
  },

  onScrollStart: function(scroller, x, y) {
    var me = this;
    setTimeout(function() {
      var diff = scroller.position.y - y;
      if (diff >= 100) {
        me.fireEvent('scrolldown');
      } else if (diff <= 0) {
        me.fireEvent('scrollup');
      }
    }, 200);
  },

  onScrollEnd: function(scroller, x, y) {
    var list = this;
    var pullPlugin = this.getPlugins()[0];
    var state = pullPlugin.getState();
    if (state === "loading") {
      list.getStore().removeAll(true);
    }
  },

  scrollToTop: function() {
    var scroller = this.getScrollable().getScroller();
    var pullPlugin = this.getPlugins()[0];
    var state = pullPlugin.getState();
    if (state !== "loading") {
      scroller.scrollTo(0, 0, true);
      this.fireEvent('scrollup');
    }
  }

});
