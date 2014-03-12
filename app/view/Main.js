/*global jsforce */
Ext.define('FastestPath.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'FastestPath.view.MyList',
    'FastestPath.view.FavedRecordList',
    'FastestPath.view.RecordSearchList',
    'FastestPath.view.Setting'
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
      xtype: 'myList'
    }, {
      title: 'Favorites',
      iconCls: 'favorites',
      xtype: 'favedRecordList'
    }, {
      title: 'Search',
      iconCls: 'search',
      xtype: 'recordSearchList'
    }, {
      title: 'Setting',
      iconCls: 'settings',
      xtype: 'setting'
    }]
  }
});
