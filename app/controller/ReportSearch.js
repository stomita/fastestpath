Ext.define('FastestPath.controller.ReportSearch', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      closeButton: {
        tap: 'closeSearchDialog'
      }
    },
    refs: {
      reportSearchDialog: 'reportSearchDialog',
      closeButton: 'reportSearchDialog button#closeButton'
    }
  },

  closeSearchDialog: function() {
    this.getReportSearchDialog().hide();
  }
});