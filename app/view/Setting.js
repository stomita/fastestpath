Ext.define('FastestPath.view.Setting', {
  extend: 'Ext.Panel',
  xtype: 'setting',
  config: {
    modal: true,
    hidden: true,
    hideOnMaskTap: true,
    showAnimation: {
      type: 'popIn'
    },
    hideAnimation: {
      type: 'popOut'
    },
    centered: true,
    width: 260,
    height: 220,
    items: [{
      xtype: 'button',
      text: 'Logout',
      itemId: 'logout'
    }]
  }

});