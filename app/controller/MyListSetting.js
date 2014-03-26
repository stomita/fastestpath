Ext.define('FastestPath.controller.MyListSetting', {
  extend: 'Ext.app.Controller',
  config: {
    control: {
      saveButton: {
        tap: 'saveMyListSetting'
      },
      deleteButton: {
        tap: 'deleteMyListConfirm'
      }
    },
    refs: {
      myListsPanel: 'myListSet #myLists',
      saveButton: 'myListSetting button#saveButton',
      deleteButton: 'myListSetting button#deleteButton'
    }
  },

  saveMyListSetting: function(button) {
    var dialog = button.up('myListSetting');
    var setting = dialog.getSetting();
    var myLists = this.getMyListsPanel();
    var myList = myLists.getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var idx = store.find('id', myList.getItemId());
    var rec = store.getAt(idx);
    for (var prop in setting) {
      rec.set(prop, setting[prop]);
    }
    rec.save();
    store.sync();
    dialog.hide();
    myList.loadListConfig(rec);

  },

  deleteMyListConfirm: function(button) {
    var dialog = button.up('myListSetting');
    var setting = dialog.getSetting();
    var me = this;
    Ext.Msg.confirm('Delete List', 'Are you sure you want to delete this list ?', function(btn) {
      if (btn === 'yes') {
        setTimeout(function() { me.deleteMyList(setting); }, 300);
        dialog.hide();
      }
    });
  },

  deleteMyList: function(setting) {
    var myLists = this.getMyListsPanel();
    var myList = myLists.getActiveItem();
    var store = Ext.StoreManager.lookup('myListConfig');
    var idx = store.find('id', myList.getItemId());
    var rec = store.getAt(idx);
    store.remove(rec);
    rec.erase();
    store.sync();
    myList.hide({ type: 'slideOut', direction: 'up' });
    setTimeout(function() {
      var idx = myLists.getActiveIndex();
      myLists.setActiveItem(idx > 0 ? idx-1 : 0);
      myLists.remove(myList, true);
      // .checkNavButton();
    }, 500);
  }

});