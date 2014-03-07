Ext.define('FastestPath.view.ReportResultList', {
  extend: 'Ext.dataview.List',
  xtype: 'reportResultList',
  requires: [
    'FastestPath.store.ReportResult'
  ],
  config: {
    xtype: 'list',
    itemTpl: '{Name}'
  },
  constructor: function(config) {
    this.callParent([ this._createComponentConfig(config) ]);
  },

  _createComponentConfig: function(config) {
    return Ext.apply({
      store: {
        type: 'reportResult',
        reportId: config.reportId
      }
    }, config);
  }

});

