Ext.define('FastestPath.view.ReportListSettingDialog', {
  extend: 'FastestPath.view.MyListSettingDialog',
  xtype: 'reportListSetting',
  config: {
    control: {
      'togglefield[name=fetchDetails]': {
        change: 'onFetchDetailsChange'
      },
      'togglefield[name=flattened]': {
        change: 'onFlattenedChange'
      }
    },
    formItems: [{
      xtype: 'fieldset',
      title: 'Report Fetch Setting',
      instructions: 'Enable when you want to fetch detail rows in report result',
      defaults: {
        labelWidth: '80%'
      },
      items: [{
        xtype: 'togglefield',
        name: 'fetchDetails',
        label: 'Fetch Detail Rows'
      }]
    }, {
      xtype: 'fieldset',
      title: 'View Option',
      instructions: 'Enable when you want to show all detail records in one flattened list view with grouping headers.',
      defaults: {
        labelWidth: '80%'
      },
      items: [{
        xtype: 'togglefield',
        name: 'flattened',
        label: 'List in Flattened View'
      }]
    }]
  },

  onFetchDetailsChange: function(toggle, fetchDetail) {
    if (!fetchDetail) {
      this.down('togglefield[name=flattened]').setValue(0);
    }
  },

  onFlattenedChange: function(toggle, flattened) {
    if (flattened) {
      this.down('togglefield[name=fetchDetails]').setValue(1);
    }
  }
});
