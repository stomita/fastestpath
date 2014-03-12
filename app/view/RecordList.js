Ext.define('FastestPath.view.RecordList', {
  extend: 'Ext.dataview.List',
  xtype: 'recordList',
  requires: [
    'Ext.TitleBar',
    'Ext.plugin.PullRefresh'
  ],
  config: {
    xtype: 'list',
    loadingText: 'Loading...',
    emptyText: 'No items available.',
    plugins: [{
      xclass: 'Ext.plugin.PullRefresh'
    }],
    itemTpl: '{Name}',
    items: [{
      xtype: 'titlebar',
      itemId: 'titlebar',
      docked: 'top',
      items: [{
        align: 'left',
        itemId: 'prev',
        text: '<span class="fa fa-caret-left"></span>'
      }, {
        align: 'right',
        itemId: 'next',
        text: '<span class="fa fa-caret-right"></span>'
      }]
    }]
  },

  constructor: function(config) {
    this.callParent(arguments);
    var titlebar = this.getComponent('titlebar');
    titlebar.setTitle(config.title);
    titlebar.on('painted', 'onTitlePainted', this);
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

  onTitlePainted: function(el) {
    el.on('tap', 'onTitleTap', this);
  },

  onTitleTap: function() {
    var scroller = this.getScrollable().getScroller();
    var pullPlugin = this.getPlugins()[0];
    var state = pullPlugin.getState();
    if (state !== "loading") {
      scroller.scrollTo(0, 0, true);
      this.fireEvent('scrollup');
    }
  }

});
