Ext.define('FastestPath.view.ReportSearchDialog', {
  extend: 'FastestPath.view.TitledList',
  xtype: 'reportSearchDialog',
  requires: [
    'FastestPath.store.ReportDef'
  ],
  config: {
    modal: true,
    hidden: true,
    zIndex: 100,
    showAnimation: {
      type: 'slide',
      direction: 'up'
    },
    hideAnimation: {
      type: 'slideOut',
      direction: 'down'
    },
    title: 'Select Report',
    titleItems: [{
      align: 'left',
      text: 'Close',
      itemId: 'closeButton'
    }],
    store: {
      type: 'reportDef'
    },
    listeners: {
      painted: 'startLoad'
    }
  },

  constructor: function() {
    this.callParent(arguments);
    this.add({
      xtype: 'toolbar',
      itemId: 'searchbar',
      docked: 'top',
      items: [{
        xtype: 'spacer'
      }, {
        xtype: 'searchfield',
        itemId: 'search',
        placeHolder: 'Search...',
        listeners: {
          action: 'startLoad',
          scope: this
        }
      }, {
        xtype: 'spacer'
      }]
    });
    this.getComponent('recordList').on('itemtap', 'onSelectRecord', this);
  },

  startLoad: function() {
    var query = this.down('#search').getValue();
    this.getStore().load({ params: { query: query } });
  },

  onSelectRecord: function(list, index, target, record) {
    this.fireEvent('select', record);
  }

});