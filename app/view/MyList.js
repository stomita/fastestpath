/*global jsforce */
Ext.define('FastestPath.view.MyList', {
  extend: 'Ext.Panel',
  xtype: 'myList',
  requires: [
    'FastestPath.view.ReportRecordList',
    'FastestPath.view.RecentRecordList'
  ],
  config: {
    layout: 'card',
    items: [{
      title: 'Recent',
      layout: 'fit',
      items: {
        title: 'Recent',
        xtype: 'recentRecordList'
      }
    }],
    listeners: {
      painted: 'onPainted'
    }
  },

  onPainted: function(el) {
    el.on('swipe', 'onSwipe', this);
  },

  onSwipe: function(e) {
    if (e.direction === 'left') {
      this.slideToNextList();
    } else if (e.direction === 'right') {
      this.slideToPrevList();
    } 
  },

  slideToNextList: function() {
    var activeItem = this.getActiveItem();
    var items = this.getInnerItems();
    var idx = items.indexOf(activeItem);
    idx = (idx + 1) % items.length;
    this.animateActiveItem(idx, { type: 'slide', reverse: false });
  },

  slideToPrevList: function() {
    var activeItem = this.getActiveItem();
    var items = this.getInnerItems();
    var idx = items.indexOf(activeItem);
    idx = (items.length + idx - 1) % items.length;
    this.animateActiveItem(idx, { type: 'slide', reverse: true });
  },

  addReportList: function(reportDef) {
    this.add({
      title: reportDef.Name,
      layout: 'fit',
      items: {
        xtype: 'reportRecordList',
        title: reportDef.Name,
        reportId: reportDef.Id
      }
    });
  }

});
