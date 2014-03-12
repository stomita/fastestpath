/*global jsforce */
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
      name: 'disabled',
      type: 'boolean'
    }],
    proxy: {
      type: 'localstorage',
      id: 'fp_list_configs'
    }
  }
});
