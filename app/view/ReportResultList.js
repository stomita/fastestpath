Ext.define('FastestPath.view.ReportResultList', {
  extend: 'Ext.dataview.List',
  xtype: 'reportResultList',
  requires: [
    'FastestPath.model.ReportResult',
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
    var cfg = Ext.apply({
      store: {
        autoLoad: true,
        model: 'FastestPath.model.ReportResult',
        params: {
          reportId: config.reportId
        }
      },
    }, config);
    this.callParent([ cfg ]);
  }

});

