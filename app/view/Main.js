Ext.define('FastestPath.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'FastestPath.view.MyListSet',
    'FastestPath.view.FavedRecordList',
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
      xtype: 'myListSet'
    }, {
      title: 'Favorites',
      iconCls: 'favorites',
      xtype: 'favedRecordList'
    }, {
      title: 'Setting',
      iconCls: 'settings',
      xtype: 'setting'
    }]
  }
});
