var assert = require('assert');

var __ = require('../');

try {
  var x = [];
  var array_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(x));
  assert.equal(array_methods.indexOf('_empty'), -1);
  
  __(Array, {
    empty: function() {
      return (this.length === 0);
    }
  });
  
  array_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(x));
  assert.notEqual(array_methods.indexOf('_empty'), -1);
  
  assert(x._empty());

  console.log("All tests passed");
  
} catch (error) {
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
  console.log(error);
}
