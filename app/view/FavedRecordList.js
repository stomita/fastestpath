/*global jsforce*/
Ext.define('FastestPath.view.FavedRecordList', {
  extend: 'Ext.Panel',
  requires: [
    'FastestPath.view.RecordList',
    'FastestPath.store.FavedRecord'
  ],
  xtype: 'favedRecordList',
  config: {
    layout: 'fit',
    items: {
      xtype: 'navList',
      title: 'Favorites',
      store: {
        type: 'faved',
        storeId: 'favedRecord',
      }
    }
  },
  initialize: function() {
    this.callParent(arguments);
    var store = this.down('navList').getStore();
    var uid = jsforce.browser.connection.userInfo.id;
    store.getProxy().setId(store.getProxy().getId() + '_' + uid);
    store.load();
  }
});