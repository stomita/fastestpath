Ext.define('FastestPath.view.MyListEntry', {
  extend: 'FastestPath.view.NavigationList',
  xtype: 'myListEntry',
  config: {
    titleItems: [{
      align: 'right',
      iconCls: 'settings',
      itemId: 'settingButton'
    }],
    listeners: {
      painted: 'onFirstPainted',
      single: true
    }
  },

  onFirstPainted: function() {
    this.getStore().load();
  }

});
