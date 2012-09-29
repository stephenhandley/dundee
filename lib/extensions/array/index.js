function _containsAllHelper (arr1, arr2, invert) {
  return arr2.every(function(el) {
    return _contains(arr1, el, invert);
  });
}

function _contains (arr, el, invert) {
  var in_array = (arr.indexOf(el) !== -1);
  return invert ? !in_array : in_array;
}

function _removeAt (arr, index) {
  var el = arr.splice(index,1);
  return (el.length > 0) ? el[0] : null;
}

module.exports = {
  compact: function () {
    return this.filter(function (value) { 
      return (value !== null);
    });
  },
  
  contains: function (el) {
    return _contains(this, el, false);
  },
  
  containsAll: function (arr) {
    return _containsAllHelper(this, arr, false);
  },
  
  containsNone: function (arr) {
    return _containsAllHelper(this, arr, true);
  },
  
  empty: function () {
    this.length = 0;
    return this;
  },
  
  // shallow.. TODO support recurse
  equals: function (arr) {
    if (this.length !== arr.length) { return false; }
    
    for (var i = 0; i < this.length; i++) {
      if (this[i] !== arr[i]) {
        return false;
      }
    }
    
    return true;
  },
  
  first: function (num) {
    return (arguments.length > 0) ? this.slice(0, num) : this[0];
  },
  
  insert: function (obj, index) {
    this.splice(index, 0, obj);
    return this;
  },
  
  isEmpty: function () {
    return (this.length === 0);
  },
  
  last: function (num) {
    if (arguments.length > 0) {
      var offset = Math.max(this.length - num, 0);
      return this.slice(offset, offset + num);
    
    } else {
      return this[this.length - 1];
    }
  },

  pluck: function (attr) {
    return this.map(function (el) {
      return el[attr];
    });
  },
  
  reject: function (test) {
    return this.filter(function (el) {
      return !test(el);
    });
  },
  
  removeAt: function (index) {
    return _removeAt(this, index);
  },
  
  remove: function (obj) {
    var index = this.indexOf(obj);
    if (index > 0) {
      return _removeAt(this, index);
    } else {
      return null;
    }
  },
  
  unique: function () {
    var results = [];
    this.forEach(function (el) {
      if (!_contains(results, el, false)) {
        results.push(el);
      }
    });
    return results;
  }
};