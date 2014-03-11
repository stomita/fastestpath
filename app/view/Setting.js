Ext.define('FastestPath.view.Setting', {
  extend: 'Ext.Panel',
  xtype: 'setting',
  config: {
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      title: 'Setting'
    }, {
      centered: true,
      items: [{
        width: 220,
        items: {
          xtype: 'button',
          text: 'Logout',
          ui: 'decline',
          itemId: 'logout'
        }
      }]
    }]
  }

});