/*global jsforce */
(function() {

Ext.define('FastestPath.store.Record', {
  extend: 'Ext.data.Store',
  requires: [
    'FastestPath.model.Record',
    'Ext.data.proxy.Direct'
  ],
  config: {
    model: 'FastestPath.model.Record'
  },
  constructor: function(config) {
    this.callParent(arguments);
    this.setProxy({
      type: 'direct',
      directFn: toDirectFn(this.doAsyncRequest, this),
      reader: {
        type: 'json',
        idProperty: 'Id',
        totalProperty: 'size',
        rootProperty: 'records'
      }
    });
  },

  /**
   * @abstract
   */
  doAsyncRequest: function() {
    // abstract
  }

});


function toDirectFn(fn, scope) {
  var directFn = function(params, callback, store) {
    callback = createHandler(callback);
    fn.call(scope, params, callback);
  };
  directFn.directCfg = {
    method: {
      getArgs: function(params) { return [ params ]; }
    }
  };
  return directFn;
}

function createHandler(callback) {
  return function(err, res) {
    callback(res, {
      getStatus: function() {
        return !err;
      },
      getResult: function() {
        return res;
      },
      getMessage: function() {
        return err.message;
      }
    });
  };
}

})();