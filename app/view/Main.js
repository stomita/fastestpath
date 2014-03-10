/*global jsforce */
Ext.define('FastestPath.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'FastestPath.view.ReportRecordList',
    'FastestPath.view.RecentRecordList'
  ],
  config: {
    tabBarPosition: 'bottom',
    layout: {
      type: 'card',
      animation: null
    },
    items: [{
      title: 'Recent Records',
      iconCls: 'time',
      layout: 'fit',
      items: {
        xtype: 'recentRecordList',
        title: 'Recent Records'
      }
    }],
    listeners: {
      activeitemchange: function(me, newPanel) {
        if (newPanel.getStore) {
          newPanel.getStore().load();
        }
      }
    }
  },

  addReportLists: function(records) {
    var panels = records.map(function(rec, i) {
      return {
        title: rec.Name,
        iconCls: ([ 'home', 'bookmarks', 'favorites', 'more' ])[i % 5],
        layout: 'fit',
        items: {
          xtype: 'reportRecordList',
          title: rec.Name,
          reportId: rec.Id
        }
      };
    });
    this.add(panels);
  }

});
