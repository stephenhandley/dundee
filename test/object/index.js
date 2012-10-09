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
  },
  
  mixin: (function () { 
    var source = {
      blah: function () {
        return "hihi " + this.name;
      },
      
      barf: function () {
        return this.name + " barf barf barf";
      },
      
      foo: function () {
        return this.name + " food";
      },
      
      x: 10,
      y: 11,
      name: "joe"
    };
    
    return {
      "should only include functions": function () {
        var destination = {
          name: "jen"
        };

        _Object.mixin.call(destination, source);
        
        ['x', 'y'].forEach(function (attr) {
          Assert.equal(Object.keys(destination).indexOf(attr), -1);
        });
        
      },

      "should by default include all functions": function () {
        var destination = {
          name: "dorf"
        };

        _Object.mixin.call(destination, source);
        
        Assert.equal(destination.blah(), "hihi dorf");
        Assert.equal(destination.barf(), "dorf barf barf barf");
        Assert.equal(destination.foo(), "dorf food");
      },

      "should include only the requested functions if second argument is passed": function () {
        var destination = {
          name: "dorf"
        };

        _Object.mixin.call(destination, source, ['blah', 'barf']);
        
        Assert.equal(destination.blah(), "hihi dorf");
        Assert.equal(destination.barf(), "dorf barf barf barf");
        Assert.throws(function () { destination.foo(); }, /has no method/);

      }
    }
  })()
};