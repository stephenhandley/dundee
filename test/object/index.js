var Assert = require('assert');
var Asserts = require('asserts');

var _Object = require('../../lib/extensions/object');

module.exports = {
  forEach: function () {
    var forEach = _Object.forEach;
    
    var x = {one: "hi", two: "hi"};
    
    var result = "";
    forEach.call(x, function (k, v) { result += k + v; });
    
    Assert.equal(result, "onehitwohi");
  },
  
  every: function () {
    var every = _Object.every;
    
    var x = {one: 1, uno: 1};
    
    Assert.equal(every.call(x, function (k, v) { return (v === 1) }), true);
    Assert.equal(every.call(x, function (k, v) { return (k === "one") }), false);
  },
  
  some: function () {
    var some = _Object.some;
    
    var x = {one: 1, dos: 2};
    
    Assert.equal(some.call(x, function (k, v) { return (v === 1) }), true);
  }
};