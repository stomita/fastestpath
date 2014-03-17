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
      directFn: this.createDirectFn(),
      reader: {
        type: 'json',
        idProperty: 'Id',
        totalProperty: 'size',
        rootProperty: 'records'
      }
    });
  },

  createDirectFn: function() {
    return toDirectFn(function(params, callback) {
      var key = [
        'resultcache', this.getStoreId(), this.getSessionKey(), this.getCallKey(params)
      ].join('-');
      console.log(key);
      var start = params.start;
      var limit = params.limit;
      params.page = 1;
      params.start = 0;
      delete params.limit;
      if (!params.refresh) {
        var result = localStorage.getItem(key);
        result = result && JSON.parse(result);
        if (result) {
          console.log('cached result found. returns.');
          console.log('statt=', start, 'limit=', limit);
          result.records = result.records.slice(start, start+limit);
          return callback(null, result);
        }
      }
      console.log('fetching from API...');
      return this.doAsyncRequest(params, function(err, result) {
        if (err) { return callback(err); }
        localStorage.setItem(key, JSON.stringify(result));
        console.log('statt=', start, 'limit=', limit);
        result.records = result.records.slice(start, start+limit);
        callback(null, result);
      });
    }, this);
  },

  /**
   *
   */
  getSessionKey: function() {
    return jsforce.browser.connection.userInfo.id;
  },

  /**
   *
   */
  getCallKey: function(params) {
    return '';
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