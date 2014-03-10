Ext.define('FastestPath.view.ReportList', {
  extend: 'Ext.dataview.List',
  xtype: 'reportList',
  requires: [
    'FastestPath.store.Report',
    'Ext.plugin.PullRefresh'
  ],
  config: {
    xtype: 'list',
    loadingTest: 'Loading...',
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
    var store = Ext.create('FastestPath.store.Report', {
      reportId: config.reportId
    });
    this.setStore(store);
    store.load();
  }

});

