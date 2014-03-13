Ext.define('FastestPath.view.MyListEntry', {
  extend: 'FastestPath.view.TitledList',
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
    }]
  },

  initialize: function() {
    this.callParent(arguments);
    this.getStore().load();
  }


});
