function _kvIter (fn) {
  return function (iter) {
    var _this = this;
    return Object.keys(this)[fn](function (k) {
      return iter(k, _this[k]);
    });
  }
}

function mixin (obj, props) { 
  if (!props) {
    props = Object.getOwnPropertyNames(obj);
  } else {
    if (!Array.isArray(props)) {
      props = [props];
    }
  }
  
  var _this = this;
  props.forEach(function(prop) {
    var prop_desc = Object.getOwnPropertyDescriptor(obj, prop);
    if (obj[prop].constructor == Function) {
      Object.defineProperty(_this, prop, prop_desc); 
    }
  });
};

module.exports = {};
['forEach', 'every', 'some'].forEach(function (fn) {
  module.exports[fn] = _kvIter(fn);
});

module.exports.mixin = mixin;