/*global jsforce, cordova*/
Ext.define('FastestPath.controller.cordova.Records', {
  extend: 'FastestPath.controller.Records',

  launch: function() {
    this.callParent(arguments);
    var app = this.getApplication();
    app.on('startup', this.startup, this);
  },

  startup: function() {
    var dw = window.open(this.getFrontdoorUrl(), '_blank', 'location=no,hidden=yes,transitionstyle=fliphorizontal');
    this.setDetailWindow(dw);
    return dw;
  },

  showRecordDetail: function(record) {
    var hash = encodeURIComponent(btoa(JSON.stringify({
      componentDef: 'force:recordHome',
      attributes: {
        values: {
          recordId: record.get('Id')
        }
      }
    })));
    var dw = this.getDetailWindow();
    dw.executeScript({ code: 'location.href = "#'+ hash + '";' }, function() {
      dw.show();
    });
  }

});