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
    itemTpl: [
      '<div class="fp-list-record">',
      '  <div class="fp-list-record-type">{Type:htmlEncode}</div>',
      '  <div class="fp-list-record-date">{Date:htmlEncode}</div>',
      '  <div class="fp-list-record-title">{Name:htmlEncode}</div>',
      '  <div class="fp-list-record-caption">{Caption:htmlEncode}</div>',
      '  <div class="fp-list-record-subcaption">{SubCaption:htmlEncode}</div>',
      '</div>'
    ].join('')
  },

  initialize: function() {
    this.callParent(arguments);
    var scroller = this.getScrollable().getScroller();
    scroller.on({
      scrollstart: 'onScrollStart',
      scrollend: 'onScrollEnd', 
      scope: this
    });
  },

  updateStore: function(store) {
    if (store) {
      store.on('load', function(store, records, success, operation) {
        if (!success) {
          this.fireEvent('exception', operation.getError());
        }
      }, this);
    }
    this.callParent(arguments);
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
