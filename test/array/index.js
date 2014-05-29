var Assert = require('assert');
var Asserts = require('asserts');

var _Array = require('../../lib/extensions/Array');

module.exports = {
  compact: function () {
    var compact = _Array.compact;

    Asserts.all.deepEqual([
      [[1, null, 23], compact, [], [1, 23]],
      [[2, null, null, 10, 5], compact, [], [2, 10, 5]]
    ]);
  },

  contains: function () {
    var contains = _Array.contains;
    var a = [1, 2, 3];

    Asserts.all.equal([
      [a, contains, [1], true],
      [a, contains, [2], true],
      [a, contains, [3], true],
      [a, contains, [4], false]
    ]);
  },

  containsAll: function () {
    var containsAll = _Array.containsAll;

    var a = [1, 2, 3, 4];
    var b = [1, 2, 3];
    var c = [1, 2];

    Asserts.all.equal([
      [a, containsAll, [b], true],
      [a, containsAll, [c], true],
      [b, containsAll, [c], true],
      [b, containsAll, [a], false],
      [c, containsAll, [b], false],
      [a, containsAll, [a], true],
      [b, containsAll, [b], true],
      [c, containsAll, [c], true]
    ]);
  },

  containsNone: function () {
    var containsNone = _Array.containsNone;

    var a = [1, 2, 3, 4];
    var b = [1, 2, 3];
    var c = [5, 6, 7];

    Asserts.all.equal([
      [a, containsNone, [b], false],
      [b, containsNone, [a], false],
      [c, containsNone, [a], true],
      [a, containsNone, [c], true],
      [b, containsNone, [c], true],
      [c, containsNone, [b], true],
      [a, containsNone, [a], false],
      [b, containsNone, [b], false],
      [c, containsNone, [c], false]
    ]);
  },
  
  doesNotContain : function () {
    var doesNotContain = _Array.doesNotContain;
    
    var arr = [2, 4, 5];
    Assert.equal(doesNotContain.call(arr, 1), true);
    Assert.equal(doesNotContain.call(arr, 2), false);
  },

  empty: function () {
    var empty = _Array.empty;

    var x = [1, 2, 3];
    empty.call(x);
    Assert.equal(x.length, 0);
    Assert.equal(x[0], undefined);
  },

  first: function () {
    var first = _Array.first;

    var x = [1, 2, 3];
    var y = [2, 4, 5, 6, 7];

    Asserts.all.deepEqual([
      [x, first, [], 1],
      [x, first, [2], [1, 2]],
      [y, first, [], 2],
      [y, first, [3], [2, 4, 5]],
      [y, first, [10], y]
    ]);
  },

  insert: function () {
    var insert = _Array.insert;

    var x = [1, 2, 3, 4];

    Asserts.all.deepEqual([
      [x, insert, [5, 0], [5, 1, 2, 3, 4]],
      [x, insert, [10, 1], [5, 10, 1, 2, 3, 4]],
      [x, insert, [100, 100], [5, 10, 1, 2, 3, 4, 100]]
    ]);
  },

  isEmpty: function () {
    var isEmpty = _Array.isEmpty;

    var x = [];
    var y = [1];
    var z = [1, 2];

    Asserts.all.equal([
      [x, isEmpty, [], true],
      [y, isEmpty, [], false],
      [z, isEmpty, [], false]
    ]);
  },
  
  isEqual: function () {
    var isEqual = _Array.isEqual;

    var w = [1, 2, 3];
    var x = [1, 2, 3];
    var y = [1, 2, 4];
    var z = [1, 2, '3'];

    Asserts.all.equal([
      [w, isEqual, [x], true],
      [x, isEqual, [w], true],
      [x, isEqual, [y], false],
      [y, isEqual, [x], false],
      [x, isEqual, [z], false],
      [z, isEqual, [x], false],
      [x, isEqual, [x], true]
    ])
  },

  last: function () {
    var last = _Array.last;

    var x = [1, 2, 3];
    var y = [2, 4, 5, 6, 7];

    Asserts.all.deepEqual([
      [x, last, [], 3],
      [x, last, [2], [2, 3]],
      [y, last, [], 7],
      [y, last, [3], [5, 6, 7]],
      [y, last, [4], [4, 5, 6, 7]],
      [y, last, [10], y]
    ]);
  },

  pluck: function () {
    var pluck = _Array.pluck;

    var x = [
      {a: 1, b: 2},
      {a: 2, b: 3},
      {a: 4, b: 5},
      {a: 8, b: 9}
    ];

    Asserts.all.deepEqual([
      [x, pluck, ['a'], [1, 2, 4, 8]],
      [x, pluck, ['b'], [2, 3, 5, 9]]
    ]);

  },

  reject: function () {
    var reject = _Array.reject;

    var x = [1, 2, 3, 4, 5];
    var y = [2, 4, 5, 6, 8];

    var even = function (x) {
      return ((x % 2) == 0);
    }

    var odd = function (x) {
      return !even(x);
    }

    Asserts.all.deepEqual([
      [x, reject, [even], [1, 3, 5]],
      [x, reject, [odd], [2, 4]],
      [y, reject, [even], [5]],
      [y, reject, [odd], [2, 4, 6, 8]]
    ]);
  },
  
  remove: function () {
    var remove = _Array.remove;

    var x = [10, 11, 13, 15];

    Assert.equal(remove.call(x, 13), 13);
    Assert.equal(x.length, 3);
    Assert.deepEqual(x, [10, 11, 15]);
    Assert.equal(remove.call(x, 100), null);
    Assert.deepEqual(x, [10, 11, 15]);
  },

  removeAt: function () {
    var removeAt = _Array.removeAt;

    var x = [2, 3, 4, 5, 6];

    Assert.equal(removeAt.call(x, 0), 2);
    Assert.equal(x.length, 4);
    Assert.equal(removeAt.call(x, 10), null);
    Assert.equal(removeAt.call(x, 2), 5);
    Assert.deepEqual(x, [3, 4, 6]);
  },

  unique: function () {
    var unique = _Array.unique;

    var x = [10, 10, 10, 10];
    var y = [10, 11, 12, 13, 11, 10];

    Asserts.all.deepEqual([
      [x, unique, [], [10]],
      [y, unique, [], [10, 11, 12, 13]]
    ]);
  }
};
