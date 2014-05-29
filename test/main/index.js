var Path = require('path');
var Assert = require('assert');

var Dundee = require('../../');

module.exports = {
  "dundee should": {
    "include extensions properly": {
      "when called with single argument (single)" : function () {
        Dundee.Array.remove();
        
        var x = [];
        
        Assert.throws(function () {
          x._isEmpty()
        }, /has no method/);
        
        Dundee.Array.include('isEmpty');

        Assert.equal(x._isEmpty(), true);
        x.push(10);
        Assert.equal(x._isEmpty(), false);
        
        Assert.throws(function () {
          x._isNotEmpty();
        });
      },
      
      "when called with an array argument (multiple)" : function () {
        Dundee.Array.remove();
        
        var y = [1, 2];
        Assert.throws(function () { y._contains(1); });
        Assert.throws(function () { y._containsAll([1, 2]); })
        
        Dundee.Array.include(['contains', 'containsAll']);
        Assert.equal(y._contains(1), true);
        Assert.equal(y._containsAll([1, 2]), true);
      },
      
      "when called with no arguments (all)" : function () {
        Dundee.Array.remove();
        
        var ArrayExtension = require('../../lib/extensions/Array');
        var extended_method_names = Object.keys(ArrayExtension);
        
        var z = []
        var array_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(z));
        
        extended_method_names.forEach(function (fn_name) {
          fn_name = '_' + fn_name;
          
          var index = array_methods.indexOf(fn_name);
          Assert.equal(index, -1);
          
          Assert.throws(function () {
            z[fn_name]();
          });
        });
        
        Dundee.Array.include();
        
        array_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(z));
        extended_method_names.forEach(function (fn_name) {
          var index = array_methods.indexOf('_' + fn_name);
          Assert.notEqual(index, -1);
        });
      },
      
      "when called with object argument" : function () {
        Dundee.Array.remove();
        
        var ArrayEmptyMixin = require('./ArrayEmptyMixin');
        Dundee.Array.include(ArrayEmptyMixin);
        
        var a = [];
        Assert.equal(a._isEmpty(), true);
        Assert.equal(a._isNotEmpty(), false);
        a.push(10);
        Assert.equal(a._isEmpty(), false);
        Assert.equal(a._isNotEmpty(), true);
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
        Dundee.Array.include({
          barf: function () {
            return "bad barf"
          }
        });
      }, /existing property _barf/ );
  
      a = new Array();
      Assert.equal(a._barf(), good_barf);
    },
  
    "break Object enumerability": function () {
      var something = 'something';
  
      Dundee.Object.include({
        doSomething: function () {
          return something;
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
      Assert.equal(a._doSomething(), something);
    }
  }
};