Ext.define('FastestPath.view.RecordSearchList', {
  extend: 'FastestPath.view.TitledList',
  xtype: 'recordSearchList',
  config: {
    store: {
      fields: ['Id', 'Name'],
      data: [
        [ '111', 'AAA' ],
        [ '112', 'BBB' ],
        [ '113', 'CCC' ]
      ]
    }
  }

});