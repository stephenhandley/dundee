var Assert = require('assert');
var Asserts = require('asserts');

var _Object = require('../../lib/extensions/Object');
var _Array  = require('../../lib/extensions/Array');

module.exports = {
  every: function () {
    var every = _Object.every;
    var x = {one: 1, uno: 1};

    Assert.equal(every.call(x, function (k, v) { return (v === 1) }), true);
    Assert.equal(every.call(x, function (k, v) { return (k === "one") }), false);
  },

  filter : function () {
    var x = { a: 'abc', b: 'bca', c: 'cab'}
    var result = _Object.filter.call(x, function(k, v) {
      return ((k === 'a') || (v === 'bca'));
    });
    Assert.equal(result.a, 'abc');
    Assert.equal(result.b, 'bca');
    Assert.equal(result.c, undefined);
  },

  // TODO ADD SUPPORT FOR DEPTH, AND BETTER EQ TEST
  flatten : function () {
    var x = { '1': 'one', '2' : 'two', '3' : 'three' };
    var flatten = _Object.flatten;

    var flat = flatten.call(x);
    var flat_expected = ['1', 'one', '2', 'two', '3', 'three'];
    Assert.equal(flat.constructor, Array);
    Assert(_Array.isEqual.call(flat, flat_expected));

    var flatter = flatten.call(x, 2);
    // Assert.equal(flatter.constructor, Array);
    // [1, "one", 2, 2, "two", 3, "three"]
  },

  forEach: function () {
    var x = {one: "hi", two: "hi"};

    var result = "";
    _Object.forEach.call(x, function (k, v) { result += k + v; });
    var expected = "onehitwohi";

    Assert.equal(result, expected);
  },

  hasKey : function () {
    var x = { a: 'a', b: 'b' };

    var _hasKey = _Object.hasKey;

    Assert.equal(_hasKey.call(x, 'a'), true);
    Assert.equal(_hasKey.call(x, 'b'), true);
    Assert.equal(_hasKey.call(x, 'c'), false);
  },

  hasValue : function () {
    var x = { a: 'a', b: 'b' };

    var _hasValue = _Object.hasValue;

    Assert.equal(_hasValue.call(x, 'a'), true);
    Assert.equal(_hasValue.call(x, 'b'), true);
    Assert.equal(_hasValue.call(x, 'c'), false);
  },

  isType : function () {
    var a = [1, 2, 3];
    var o = { one : 1 };
    var _isType = _Object.isType;
    Assert(_isType.call(a, Array));
    Assert(_isType.call(o, Object));
  },

  keys : function () {
    var x = { yo : 2, mtv : 'raps' };
    var result = _Object.keys.call(x).join('!');
    var expected = 'yo!mtv';
    Assert.equal(result, expected);
  },

  map : function () {
    var x = { x : 1, y : 2 };
    var result = _Object.map.call(x, function (k, v) {
      return k + ':' + v;
    });
    Assert.equal(Object.keys(x).length, Object.keys(result).length);
    Assert.equal(result.x, 'x:1');
    Assert.equal(result.y, 'y:2');
  },

  merge : function () {
    x = { one : 1, two : 2 };
    y = { one : 3, four : 4 };
    var result = _Object.merge.call(x, y); // should be { one : 3, two : 2, four : 4}
    Assert.equal(result, x);
    Assert.equal(x.one, 3);
    Assert.equal(x.two, 2);
    Assert.equal(x.four, 4);
  },

  omit : function () {
    var x = { a: 'abc', b: 'bca', c: 'cab'}
    var result = _Object.omit.call(x, ['c']);
    Assert.equal(result.a, 'abc');
    Assert.equal(result.b, 'bca');
    Assert.equal(result.c, undefined);
  },

  pick : function () {
    var x = { a: 'abc', b: 'bca', c: 'cab'}
    var result = _Object.pick.call(x, ['a', 'b']);
    Assert.equal(result.a, 'abc');
    Assert.equal(result.b, 'bca');
    Assert.equal(result.c, undefined);
  },

  pprint : function () {
    var x = { one: 1, dos: 2};
    var expected = "{\n  \"one\": 1,\n  \"dos\": 2\n}";
    var result = _Object.pprint.call(x);
    Assert.equal(result, expected);
  },

  remove : function () {
    var x = { yo : 1, mtv : 'raps' };
    Assert.equal(x.yo, 1);
    Assert.equal(x.mtv, 'raps');

    _Object.remove.call(x, 'yo');
    Assert.equal(x.yo, undefined)
    Assert.equal(x.mtv, 'raps');
  },

  rmerge : function () {
    x = { one : 1, two : 2 };
    y = { one : 3, four : 4 };
    result = _Object.rmerge.call(x, y); // should be { one : 1, two : 2, four : 4}

    Assert.equal(x.one, 1);
    Assert.equal(x.two, 2);
    Assert.equal(x.four, 4);
  },

  some: function () {
    var x = {one: 1, dos: 2};
    var result = _Object.some.call(x, function (k, v) { return (v === 1) });
    Assert.equal(result, true);
  },

  type: function () {
    var x = { one : 1 };
    var type = _Object.type;
    Assert.equal(type.call(x), Object);
  }
};