Ext.define('FastestPath.view.RecordList', {
  extend: 'Ext.dataview.List',
  xtype: 'recordList',
  requires: [
    'FastestPath.store.Report',
    'Ext.plugin.PullRefresh'
  ],
  config: {
    xtype: 'list',
    loadingText: 'Loading...',
    plugins: [{
      xclass: 'Ext.plugin.PullRefresh'
    }],
    itemTpl: '{Name}'
  },
  constructor: function(config) {
    this.callParent(arguments);
    this.add({
      xtype: 'titlebar',
      docked: 'top',
      title: config.title,
      items: [{
        align: 'right',
        itemId: 'setting',
        iconCls: 'settings'
      }]
    });
  }
});
