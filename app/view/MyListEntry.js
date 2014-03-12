Ext.define('FastestPath.view.MyListEntry', {
  extend: 'FastestPath.view.TitledList',
  xtype: 'myListEntry',
  config: {
    titleItems: [{
      align: 'left',
      itemId: 'prev',
      hidden: true,
      text: '<span class="fa fa-caret-left"></span>'
    }, {
      align: 'right',
      iconCls: 'settings',
      itemId: 'settingButton'
    }, {
      align: 'right',
      itemId: 'next',
      hidden: true,
      text: '<span class="fa fa-caret-right"></span>'
    }]
  },

  constructor: function(config) {
    this.callParent(arguments);
    this.getStore().load();
  }


});
