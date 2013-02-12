var Path = require('path');
var Assert = require('assert');

var __ = require('../../');

module.exports = {
  "dundee should": {
    "attach functions passed via object": function () {
      __.remove(Array);
      
      // sanity check.. shouldn't start with empty method
      var x = [];
      var array_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(x));
      Assert.equal(array_methods.indexOf('_empty'), -1);
      
      __(Array, {
        empty: function() {
          return (this.length === 0);
        }
      });

      // should have the empty method
      array_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(x));
      Assert.notEqual(array_methods.indexOf('_empty'), -1);      
      
      // empty method should work as expected
      Assert.equal(x._empty(), true);
      x.push(10);
      Assert.equal(x._empty(), false);
    },
    
    "filter and attach via local require": function () {
      __.remove(Array);
      __(Array, require('./array'), ['empty']);
      
      var barf = ["barf"];
      
      // should only have the empty function but not notEmpty
      array_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(barf));
      Assert.notEqual(array_methods.indexOf('_empty'), -1);
      Assert.equal(array_methods.indexOf('_notEmpty'), -1);
      
      Assert.equal(barf._empty(), false);
    },
        
    "attach functions via bundled extensions": function () {
      __(String);
      
      var hihi= "hi_hi";
      
      // should have the methods from npm
      Assert.equal(hihi._capitalize(), "Hi_hi");
      Assert.equal(hihi._camelize(), "hiHi");
      Assert.equal(hihi._endsWith('i'), true);
    },
    
    "filter and attach functions via bundled extensions": function () {
      __.remove(String);
      __(String, ['capitalize', 'camelize']);
      
      var hihi = "hi_hi";
      
      // should have the two methods but not any others
      Assert.equal(hihi._capitalize(), "Hi_hi");
      Assert.equal(hihi._camelize(), "hiHi");
      Assert.throws(function () { hihi._endsWith('barf'); }, /has no method/);
    },
    
    "properly attach and remove functions": function () {
      __.remove(String);
      
      var string_extension = Path.join(__dirname, '..', '..', 'lib', 'extensions', 'string');
      var method_names = Object.getOwnPropertyNames(require(string_extension));
      
      var s = "string!!!!";
      
      var assertHasMethod = function (method_name, invert) {
        var expected = invert ? false : true;
        Assert.equal(__.has(s, method_name), expected);
        Assert.equal(__.has(String, method_name), expected);
      };
      
      var assertDoesNotHaveMethod = function (method_name) {
        assertHasMethod(method_name, true);
      };
      
      // shouldn't have any of the extension methods at start   
      method_names.forEach(function (method_name) {
        assertDoesNotHaveMethod(method_name);
      });
      
      __(String);
      
      // should have all the extension methods now
      method_names.forEach(function (method_name) {
        assertHasMethod(method_name);
      });
      
      var removed_method_names = [];
      while (method_names.length > 0) {
        var removed_method_name = method_names.pop();
        __.remove(String, removed_method_name);
        removed_method_names.push(removed_method_name);
        
        // shouldn't have the removed method
        removed_method_names.forEach(function (method_name) {
          assertDoesNotHaveMethod(method_name);
        });
        
        // should still have all the other methods we attached before
        method_names.forEach(function (method_name) {
          assertHasMethod(method_name);
        });
      }
    }
  },
  
  "dundee should not": {
    "overwrite existing properties on a prototype": function () {
      var good_barf = "barf";
      
      Array.prototype._barf = function () {
        return good_barf;
      }
      Assert.throws(function () {
        __(Array, {
          barf: function () {
            return "bad barf"
          }
        });
      }, /Dundee attach of/ );
      
      a = new Array();
      Assert.equal(a._barf(), good_barf);
    },
    
    "break Object enumerability": function () {
      __(Object, {
        doSomething: function () {
          return 'something';
        }
      });
      
      a = { x : 2, y: 3 };
      keys = [];
      for (var k in a) {
        keys.push(k);
      }
      Assert.equal(keys.length, 2);
      Assert.notEqual(keys.indexOf('x'), -1);
      Assert.notEqual(keys.indexOf('y'), -1);
    }
  }
};