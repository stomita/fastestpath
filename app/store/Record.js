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

  doAsyncRequest: function(params, callback) {
    var me = this;
    var key = [
      'resultcache', this.getStoreId(), this.getSessionKey(), this.getCallKey(params)
    ].join('-');
    console.log(key);
    if (!params.refresh) {
      var res = localStorage.getItem(key);
      res = res && JSON.parse(res);
      if (res) {
        console.log('cached response found: ', res);
        return callback(null, me.convertToResult(params, res));
      }
    }
    console.log('fetching from API...');
    return this.doFetch(params, function(err, res) {
      if (err) { return callback(err); }
      localStorage.setItem(key, JSON.stringify(res));
      console.log('fetched:', res);
      return callback(null, me.convertToResult(params, res));
    });
  },

  /**
   * @abstract
   */
  doFetch: function(params, callback) {
    callback(null, {});
  },

  /**
   *
   */
  convertToResult: function(params, res) {
    res.records = res.records.slice(params.start, params.start+params.limit);
    return res;
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