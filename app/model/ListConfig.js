Ext.define('FastestPath.model.ListConfig', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'id'
    }, {
      name: 'title'
    }, {
      name: 'type'
    }, {
      name: 'fetchDetails',
      type: 'boolean',
      defaultValue: true
    }, {
      name: 'flattened',
      type: 'boolean',
      defaultValue: false
    }],
    proxy: {
      type: 'localstorage',
      id: 'fp_list_configs'
    }
  }
});
