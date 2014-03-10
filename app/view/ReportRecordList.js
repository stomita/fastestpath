Ext.define('FastestPath.view.ReportRecordList', {
  extend: 'FastestPath.view.RecordList',
  xtype: 'reportRecordList',
  constructor: function(config) {
    this.callParent(arguments);
    var store = Ext.create('FastestPath.store.Report', {
      reportId: config.reportId
    });
    this.setStore(store);
    store.load();
  }
});

