var assert = require('assert');
var asserts = require('asserts');

var funcs = require('../../lib/extensions/string');

module.exports = {
  capitalize: function () {
    var capitalize = funcs.capitalize;
    
    asserts.allEqual([
      ["something",      capitalize, [], "Something"],
      ["Something",      capitalize, [], "Something"],
      ["something else", capitalize, [], "Something else"]
    ]);
  },
    
  camelize: function () {
    var camelize = funcs.camelize;
    
    asserts.allEqual([
      ["here_is_something", camelize, [], "hereIsSomething"],
      ["hereIsSomething",   camelize, [], "hereIsSomething"],
      ["here is something", camelize, [], "hereIsSomething"]
    ])
  },
  
  underscorize: function () {
    var underscorize = funcs.underscorize;
    
    asserts.allEqual([
      ["hereIsSomething",   underscorize, [], "here_is_something"],
      ["here is something", underscorize, [], "here_is_something"],
      ["here_is_something", underscorize, [], "here_is_something"]
    ]);
  },
  
  pluralize: function () {
    var pluralize = funcs.pluralize;
        
    asserts.allEqual([
      ["vomit", pluralize, [], "vomits"],
      ["barf",  pluralize, [], "barves"],
      ["thing", pluralize, [], "things"]
    ]);
  },
  
  contains: function () {
    var sentence = "here is a big stupid sentence about barf";
    var contains = funcs.contains;
    
    asserts.allEqual([
      [sentence, contains, "here",  true],
      [sentence, contains, "abouts", false],
      [sentence, contains, "vomit", false],
      [sentence, contains, "is a",  true]
    ]);
  },
  
  startsWith: function () {
    var something = "something";
    var okay = "okay wow super awesome";
    var startsWith = funcs.startsWith;
    
    asserts.allEqual([
      [something, startsWith, "some",     true],
      [something, startsWith, "barf",     false],
      [okay,      startsWith, "okay wow", true],
      [okay,      startsWith, "okay ",    true],
      [okay,      startsWith, "honk",     false]
    ]);
  },
  
  endsWith: function () {
    var something = "something";
    var okay = "okay wow super awesome";
    var endsWith = funcs.endsWith;
    
    asserts.allEqual([
      [something, endsWith, "thing",    true],
      [something, endsWith, "barf",     false],
      [okay,      endsWith, " awesome", true],
      [okay,      endsWith, "e",        true],
      [okay,      endsWith, "honk",     false]
    ]);
  }
};



