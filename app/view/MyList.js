Ext.define('FastestPath.view.MyList', {
  extend: 'FastestPath.view.NavigationList',
  xtype: 'myList',
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
