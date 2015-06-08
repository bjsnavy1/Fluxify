var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";


var _catalog = [
    {id:1, title: 'Micheal Jordan', skillLevel: 98},
    {id:2, title: 'Eldin Baylor', skillLevel: 84},
    {id:3, title: 'Bill Walton', skillLevel: 35},
    {id:4, title: 'Dominque Wilkins', skillLevel: 87},
    {id:5, title: 'Gary Payton', skillLevel: 89},
    {id:6, title: 'Shawn Kemp', skillLevel: 85},
    {id:6, title: 'David Robinson', skillLevel: 86},
    {id:6, title: 'Shaquille Oneal', skillLevel: 87},
    {id:6, title: 'Penny Hardaway', skillLevel: 85},
    {id:6, title: 'Alonzo Mourning', skillLevel: 86},
    {id:6, title: 'Chris Webber', skillLevel: 82},
    {id:6, title: 'Tim Hardaway', skillLevel: 85},
    {id:6, title: 'Jalen Rose', skillLevel: 81}
  ];

var _cartItems = [];


function _removeItem(index){
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index){
  _cartItems[index].qty++;
}

function _decreaseItem(index){
  if(_cartItems[index].qty>1){
    _cartItems[index].qty--;
  }
  else {
    _removeItem(index);
  }
}


function _addItem(item){
  if(!item.inCart && _cartItems.length < 5){
    item['skillLevel'] = item.skillLevel;
    item['inCart'] = true;
    _cartItems.push(item);
  }
  else {
    _cartItems.forEach(function(cartItem, i){
      if(cartItem.id===item.id){
        _increaseItem(i);
      }
    });
  }
}

var AppStore = merge(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT)
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getCart:function(){
    return _cartItems
  },

  getCatalog:function(){
    return _catalog
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;

      case AppConstants.REMOVE_ITEM:
        _removeItem(payload.action.index);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;

      case AppConstants.DECREASE_ITEM:
        _decreaseItem(payload.action.index);
        break;
    }
    AppStore.emitChange();

    return true;
  })
})

module.exports = AppStore;