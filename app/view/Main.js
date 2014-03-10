/*global jsforce */
Ext.define('FastestPath.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'FastestPath.view.ReportList'
  ],
  config: {
    tabBarPosition: 'bottom',
    layout: {
      type: 'card',
      animation: null
    },
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
  }

});
