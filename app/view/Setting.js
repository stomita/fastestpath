Ext.define('FastestPath.view.Setting', {
  extend: 'Ext.ActionSheet',
  xtype: 'setting',
  config: {
    hidden: true,
    hideOnMaskTap: true,
    centered: true,
    items: [{
      xtype: 'button',
      text: 'Logout',
      ui: 'decline',
      itemId: 'logout'
    }]
  }

});