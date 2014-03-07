/*global jsforce,cordova */
Ext.define('FastestPath.store.Report', {
  alias: 'store.report',
  extend: 'Ext.data.Store',
  config: {
    fields: [ 'Name' ],
    data: []
  },
  constructor: function() {
    this.callParent(arguments);
    var me = this;
    jsforce.browser.connection.sobject('Report').find().execute(function(err, records) {
      if (!err) {
        me.setData(records);
      }
    });
  }
});