Ext.define('FastestPath.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'Ext.TitleBar'
  ],
  config: {
    tabBarPosition: 'bottom',
    items: [{
      title: 'Welcome',
      iconCls: 'home',
      scrollable: true,
      items: [{
        docked: 'top',
        xtype: 'titlebar',
        title: 'Reports'
      }, {
        xtype: 'list',
        store: 'reportList',
        itemTpl: '{Name}'
      }]
    }, {
      title: 'Get Started',
      iconCls: 'action',
      items: [{
        docked: 'top',
        xtype: 'titlebar',
        title: 'Getting Started'
      }]
    }]
  }
});
