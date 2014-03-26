Ext.define('FastestPath.view.MyListSettingDialog', {
  extend: 'Ext.Sheet',
  xtype: 'myListSetting',
  config: {
    hidden: true,
    hideOnMaskTap: true,
    layout: 'fit',
    width: '100%',
    height: '100%',
    style: 'background-color: white',
    control: {
      'field': {
        change: 'onFieldChange'
      },
      'button#close': {
        tap: 'hide'
      }
    },
    enter: 'down',
    exit: 'down',
    showAnimation: 'slide',
    hideAnimation: 'slideOut',
    items: [{
      xtype: 'titlebar',
      docked: 'top',
      itemId: 'titlebar',
      title: 'Setting',
      items: [{
        xtype: 'button',
        itemId: 'close',
        align: 'left',
        text: 'Close'
      }, {
        xtype: 'button',
        itemId: 'saveButton',
        align: 'right',
        ui: 'action',
        text: 'Save'
      }]
    }, {
      xtype: 'formpanel',
      itemId: 'form',
      layout: 'vbox',
      items: [{
        items: {
          xtype: 'button',
          style: 'margin: 5em auto',
          itemId: 'deleteButton',
          text: 'Delete This List',
          ui: 'decline',
          width: 220
        }
      }]
    }],
    setting: null,
    formItems: null
  },

  applySetting: function(setting) {
    this.getComponent('form').setValues(setting);
    return setting;
  },

  onFieldChange: function(field, newValue) {
    var setting = this.getSetting() || {};
    setting[field.getName()] = field.xtype === 'togglefield' ? !!newValue : newValue;
    this.setSetting(setting);
  },

  applyFormItems: function(items) {
    var formPanel = this.getComponent('form');
    return formPanel.insert(0, items);
  }

});
