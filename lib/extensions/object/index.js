var Type = require('type-of-is');

var _Array = require('../Array/index');

function _keyIter (fn) {
  return function (iter) {
    var _this = this;
    var _keys = keys.call(this);

    var keyIter = function (k) {
      return iter(k, _this[k]);
    };
    
    return _keys[fn](keyIter);
  }
}

function defaults (obj) {

}

function empty () {
  var _keys = keys.call(this);
  return (_keys.length == 0);
}

var every = _keyIter('every');

function filter (test) {
  var result = {};
  forEach.call(this, function (k, v) {
    if (test(k, v)) {
      result[k] = v;
    }
  });
  return result;
}

function flatten (depth) {
  result = [];
  forEach.call(this, function (k, v) {
    result.push(k);
    result.push(v);
  });
  return result;
}

var forEach = _keyIter('forEach');

var forEachKey = function (callback) {
  forEach.call(this, function (k, v) {
    callback(k);
  });
};

var forEachValue = function (callback) {
  forEach.call(this, function (k, v) {
    callback(v);
  });
};

function keys () {
  return Object.keys(this);
}

function hasKey (key) {
  var _keys = keys.call(this);
  return _Array.contains.call(_keys, key);
}

function hasValue (value) {
  var vals = values.call(this);
  return _Array.contains.call(vals, value);
}

function invert () {

}

function isType (type) {
  return Type(this, type);
}

function instanceOf (type) {
  return (this instanceof type);
}

function isEqual (obj) {

}

function keyFor (value) {

}

function length () {
  var _keys = keys.call(this);
  return _keys.length;
}

// rename as traverse
function map (callback) {
  var result = {};
  forEach.call(this, function (k, v) {
    result[k] = callback(k, v);
  });
  return result;
}

function merge (obj) {
  var _this = this;
  forEach.call(obj, function (k, v) {
    _this[k] = v;
  });
  return this;
}

function omit (_keys) {
  if (!(_keys.constructor === Array)) {
    _keys = [_keys];
  }
  return filter.call(this, function (k, v) {
    return _Array.doesNotContain.call(_keys, k);
  });
}

function pick (_keys) {
  if (!(_keys.constructor === Array)) {
    _keys = [_keys];
  }
  return filter.call(this, function (k, v) {
    return _Array.contains.call(_keys, k);
  });
}

function pprint (spaces) {
  if (!spaces) {
    spaces = 2;
  }
  return JSON.stringify(this, null, spaces);
}

function reject (test) {
  var invertedTest = function (k, v) {
    return !test(k, v)
  };
  return filter.call(this, invertedTest);
}

function remove (key) {
  var val = this[key];
  delete this[key];
  return val;
}

function removeIf (test) {
  var _this = this;
  forEach.call(this, function (k, v) {
    if (test(k, v)) {
      delete _this[k];
    };
  });
}

function rmerge (obj) {
  var _this = this;
  var _keys = keys.call(this);

  forEach.call(obj, function (k, v) {
    if (_Array.doesNotContain.call(_keys, k)) {
      _this[k] = v;
    }
  });
  return this;
}

var some = _keyIter('some');

function toArray () {
  var array = [];
  forEach.call(this, function (k, v) {
    array.push([k, v]);
  });
  return array;
}

function traverse () {

}

function type () {
  return Type.of(this);
}

function values () {
  var values = [];
  forEach.call(this, function (k, v) {
    values.push(v);
  });
  return values;
}

module.exports = {
  defaults     : defaults,
  empty        : empty,
  every        : every,
  filter       : filter,
  flatten      : flatten,
  forEach      : forEach,
  forEachKey   : forEachKey,
  forEachValue : forEachValue,
  hasKey       : hasKey,
  hasValue     : hasValue,
  invert       : invert,
  isEqual      : isEqual,
  isType       : isType,
  keyFor       : keyFor,
  keys         : keys,
  length       : length,
  map          : map,
  merge        : merge,
  omit         : omit,
  pick         : pick,
  pprint       : pprint,
  reject       : reject,
  remove       : remove,
  removeIf     : removeIf,
  rmerge       : rmerge,
  some         : some,
  toArray      : toArray,
  type         : type,
  values       : values
};

// clone
function copy(o){
  var copy = Object.create( Object.getPrototypeOf(o) );
  var propNames = Object.getOwnPropertyNames(o);

  propNames.forEach(function(name){
    var desc = Object.getOwnPropertyDescriptor(o, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}

