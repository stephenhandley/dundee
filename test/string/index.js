var Assert = require('assert');
var Asserts = require('asserts');

var String = require('../../lib/extensions/String');

module.exports = {
  capitalize: function () {
    var capitalize = String.capitalize;

    Asserts.all.equal([
      ["something",      capitalize, [], "Something"],
      ["Something",      capitalize, [], "Something"],
      ["something else", capitalize, [], "Something else"]
    ]);
  },

  camelize: function () {
    var camelize = String.camelize;

    Asserts.all.equal([
      ["here_is_something", camelize, [], "hereIsSomething"],
      ["hereIsSomething",   camelize, [], "hereIsSomething"],
      ["here is something", camelize, [], "hereIsSomething"]
    ])
  },

  underscorize: function () {
    var underscorize = String.underscorize;

    Asserts.all.equal([
      ["hereIsSomething",   underscorize, [], "here_is_something"],
      ["here is something", underscorize, [], "here_is_something"],
      ["here_is_something", underscorize, [], "here_is_something"]
    ]);
  },

  pluralize: function () {
    var pluralize = String.pluralize;

    Asserts.all.equal([
      ["vomit", pluralize, [], "vomits"],
      ["barf",  pluralize, [], "barves"],
      ["thing", pluralize, [], "things"]
    ]);
  },

  contains: function () {
    var sentence = "here is a big stupid sentence about barf";
    var contains = String.contains;

    Asserts.all.equal([
      [sentence, contains, "here",  true],
      [sentence, contains, "abouts", false],
      [sentence, contains, "vomit", false],
      [sentence, contains, "is a",  true]
    ]);
  },

  startsWith: function () {
    var something = "something";
    var okay = "okay wow super awesome";
    var startsWith = String.startsWith;

    Asserts.all.equal([
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
    var endsWith = String.endsWith;

    Asserts.all.equal([
      [something, endsWith, "thing",    true],
      [something, endsWith, "barf",     false],
      [okay,      endsWith, " awesome", true],
      [okay,      endsWith, "e",        true],
      [okay,      endsWith, "honk",     false]
    ]);
  }
};



