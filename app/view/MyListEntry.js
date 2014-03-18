Ext.define('FastestPath.view.MyListEntry', {
  extend: 'FastestPath.view.NavigationList',
  xtype: 'myListEntry',
  config: {
    titleItems: [{
      align: 'left',
      itemId: 'prevButton',
      text: '<span class="fa fa-caret-left"></span>',
      width: 40
    }, {
      align: 'right',
      iconCls: 'settings',
      itemId: 'settingButton'
    }, {
      align: 'right',
      itemId: 'nextButton',
      text: '<span class="fa fa-caret-right"></span>',
      width: 40
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
