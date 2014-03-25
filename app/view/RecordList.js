Ext.define('FastestPath.view.RecordList', {
  extend: 'Ext.dataview.List',
  xtype: 'recordList',
  requires: [
    'Ext.plugin.PullRefresh',
    'Ext.plugin.ListPaging'
  ],
  config: {
    loadingText: 'Loading...',
    emptyText: 'No items available.',
    plugins: [{
      xclass: 'Ext.plugin.PullRefresh'
    }, {
      xclass: 'Ext.plugin.ListPaging',
      autoPaging: true
    }],
    itemTpl: [
      '<div class="fp-list-record" ',
      '<tpl if="recordId">',
      '  data-record-id="{recordId}" ',
      '</tpl>',
      '>',
      '<tpl if="!isGroup && recordId">',
      '  <div class="fp-list-record-favmark"></div>',
      '</tpl>',
      '  <div class="fp-list-record-type">{type:htmlEncode}</div>',
      '  <div class="fp-list-record-date">{date:htmlEncode}</div>',
      '  <div class="fp-list-record-title">',
      '<tpl if="icon">',
      '  <span class="fp-list-record-icon fa fa-{icon:htmlEncode}"></span>',
      '</tpl>',
      '{title:htmlEncode}',
      '  <tpl if="isGroup && count &gt; -1">',
      '  ({count:htmlEncode})',
      '  </tpl>',
      '  </div>',
      '  <div class="fp-list-record-caption">{caption:htmlEncode}</div>',
      '  <div class="fp-list-record-subcaption">{subCaption:htmlEncode}</div>',
      '  <tpl if="isGroup">',
      '  <span class="fp-list-record-drilldown fa fa-angle-right"></span>',
      '  </tpl>',
      '</div>'
    ].join('')
  },

  initialize: function() {
    this.callParent(arguments);
    var scroller = this.getScrollable().getScroller();
    scroller.on({
      refresh: 'onRefresh',
      scrollstart: 'onScrollStart',
      scrollend: 'onScrollEnd', 
      scope: this
    });
  },

  onRefresh: function() {
    var favStore = Ext.StoreManager.lookup('favedRecord');
    var viewItems = this.getViewItems();
    viewItems.forEach(function(item) {
      var recordEl = item.element.down('.fp-list-record');
      var recordId = recordEl.dom.dataset.recordId;
      if (recordId) {
        if (favStore.find('recordId', recordId) >= 0) {
          recordEl.addCls('faved');
        } else {
          recordEl.removeCls('faved');
        }
      }
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
    var store = list.getStore();
    var proxy = store.getProxy();
    var pullPlugin = this.getPlugins()[0];

    var state = pullPlugin.getState();
    if (state === "loading") {
      pullPlugin.on({
        latestfetched: 'onLatestFetched',
        single: true,
        scope: this
      });
      if (proxy.getExtraParams) {
        var eparams;
        eparams = proxy.getExtraParams() || {};
        eparams.refresh = true;
        proxy.setExtraParams(eparams);
      }
      store.removeAll(true);
    }
  },

  onLatestFetched: function(pullplugin, records) {
    var store = this.getStore();
    store.currentPage = 1;
    var proxy = store.getProxy();
    if (proxy.getExtraParams) {
      var eparams = proxy.getExtraParams() || {};
      delete eparams.refresh;
      proxy.setExtraParams(eparams);
    }
    if (records.length === 0) {
      store.removeAll();
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
