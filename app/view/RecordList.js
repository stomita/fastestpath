Ext.define('FastestPath.view.RecordList', {
  extend: 'Ext.dataview.List',
  xtype: 'recordList',
  requires: [
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
    this.getComponent('titlebar').setTitle(config.title);
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
