Ext.define('FastestPath.view.RecentRecordList', {
  extend: 'FastestPath.view.RecordList',
  xtype: 'recentRecordList',
  constructor: function(config) {
    this.callParent(arguments);
    var store = Ext.create('FastestPath.store.Recent', {
      sobjectType: config.sobjectType
    });
    this.setStore(store);
    store.load();
  }
});

