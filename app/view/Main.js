/*global jsforce */
Ext.define('FastestPath.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'FastestPath.view.MyList'
  ],
  config: {
    tabBarPosition: 'bottom',
    layout: {
      type: 'card',
      animation: null
    },
    items: [{
      title: 'My Lists',
      iconCls: 'bookmarks',
      layout: 'fit',
      items: {
        xtype: 'myList',
      }
    }, {
      title: 'Setting',
      iconCls: 'settings',
      xtype: 'setting'
    }]
  }
});
