function _containsAllHelper (arr1, arr2, invert) {
  var iter = function(el) {
    return _contains(arr1, el, invert);
  };  
  return arr2.every(iter);
}

function _contains (arr, el, invert) {
  var index = arr.indexOf(el);
  var in_array = (index !== -1);
  return invert ? !in_array : in_array;
}

function _removeAt (arr, index) {
  var el = arr.splice(index,1);
  return (el.length > 0) ? el[0] : null;
}

function compact () {
  var iter = function (value) {
    return (value != null);
  };
  return this.filter(iter);
}

function contains (el) {
  return _contains(this, el, false);
}

function containsAll (arr) {
  return _containsAllHelper(this, arr, false);
}

function containsNone (arr) {
  return _containsAllHelper(this, arr, true);
}

function doesNotContain (el) {
  return _contains(this, el, true);
}

function empty () {
  this.length = 0;
  return this;
}

function first (num) {
  return (arguments.length > 0) ? this.slice(0, num) : this[0];
}

function insert (obj, index) {
  this.splice(index, 0, obj);
  return this;
}

function isEmpty () {
  return (this.length === 0);
}

// shallow.. TODO support recurse
function isEqual (arr) {
  if (this.length !== arr.length) {
    return false;
  }

  for (var i = 0; i < this.length; i++) {
    if (this[i] !== arr[i]) {
      return false;
    }
  }

  return true;
}

function last (num) {
  if (arguments.length > 0) {
    var offset = Math.max(this.length - num, 0);
    return this.slice(offset, offset + num);

  } else {
    return this[this.length - 1];
  }
}

function pluck (attr) {
  var iter = function (el) {
    return el[attr];
  };
  return this.map(iter);
}

function reject (test) {
  function iter (el) {
    return !test(el);
  }
  return this.filter(iter);
}

function remove (el) {
  var index = this.indexOf(el);

  if (index > 0) {
    return _removeAt(this, index);
  } else {
    return null;
  }
}

function removeAt (index) {
  return _removeAt(this, index);
}

function unique () {
  var results = []; 

  this.forEach(function (el) {
    if (!_contains(results, el, false)) {
      results.push(el);
    }
  });
  
  return results;
}

module.exports = {
  compact: compact,
  contains: contains,
  containsAll: containsAll,
  containsNone: containsNone,
  doesNotContain: doesNotContain,
  empty: empty,
  first: first,
  insert: insert,
  isEmpty: isEmpty,
  isEqual: isEqual,
  last: last,
  pluck: pluck,
  reject: reject,
  removeAt: removeAt,
  remove: remove,
  unique: unique
};