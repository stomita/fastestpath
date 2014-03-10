/*global jsforce */
Ext.define('FastestPath.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'Ext.TitleBar',
    'FastestPath.view.ReportList'
  ],
  config: {
    tabBarPosition: 'bottom',
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      title: 'Salesforce Reports'
    }],
    listeners: {
      activeitemchange: function(me, newPanel) {
        if (newPanel.getStore) {
          newPanel.getStore().load();
        }
      }
    }
  },

  initialize: function() {
    this.callParent(arguments);
    var conn = jsforce.browser.connection;
    var me = this;
    conn.sobject('Report')
      .find({ DeveloperName: { $like: 'FP%' } }, 'Id, Name')
      .orderby('DeveloperName')
      .limit(5)
      .execute(function(err, records) {
        var panels = records.map(function(rec, i) {
          return {
            title: rec.Name,
            iconCls: ([ 'home', 'bookmarks', 'favorites', 'time', 'info' ])[i % 5],
            layout: 'fit',
            items: {
              xtype: 'reportList',
              reportId: rec.Id
            }
          };
        });
        me.add(panels);
      }).then(null, function(err) {
        console.error(err.message, err.stack);
      });
  }

});
