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
    var store = Ext.create('FastestPath.store.Report', {
      reportId: config.reportId
    });
    this.setStore(store);
    store.load();
  }

});

