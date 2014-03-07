Ext.define('FastestPath.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'Ext.TitleBar',
    'FastestPath.store.Report'
  ],
  config: {
    tabBarPosition: 'bottom',
    items: [{
      title: 'Welcome',
      iconCls: 'home',
      scrollable: true,
      layout: 'fit',
      items: [{
        docked: 'top',
        xtype: 'titlebar',
        title: 'Reports'
      }, {
        xtype: 'list',
        store: {
          type: 'report'
        },
        itemTpl: '{Name}'
      }]
    }, {
      title: 'Get Started',
      iconCls: 'action',
      items: [{
        docked: 'top',
        xtype: 'titlebar',
        title: 'Getting Started'
      }, {
        html : 'Hello, world'
      }]
    }]
  }
});
