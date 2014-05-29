# Description

Extend native objects with methods prefixed by '_'

# Latest Version

3.0.0

# Installation

in package.json 

```json
{
  ...
  "dependencies": {
    "dundee": "3.0.0"
  }
  ...
}
```

# Usage

Basic example including isEmpty from Dundee Array extensions
```js
var Dundee = require('dundee');

Dundee.Array.include('isEmpty');

var x = [];
x._isEmpty(); // true
x.push(2);
x._isEmpty(); // false

Dundee.Array.remove('isEmpty');
x._isEmpty(); // throws error ~= /has no method/
```

```js
// include all Dundee Array extensions
Dundee.Array.include()

// include a single extension
Dundee.Array.include('isEmpty')

// use array argument to include multiple extensions
Dundee.Array.include(['pluck', 'reject'])

// include user defined extensions
Dundee.Array.include({
  derp : function () {},
  honk : function () {}
});

// remove all array extensions
Dundee.Array.remove()

// remove a single extension
Dundee.Array.remove('isEmpty')

// remove multiple extensions
Dundee.Array.remove(['pluck', 'reject', 'derp', 'honk'])

```

# TODO
## string

camelize
contains
count
enclose
extract
forEach
forEachWord
linkify
many
randomize
remove
reverse
shorten
sort
toDOM
trim
wrap

ltrim
rtrim

http://stackoverflow.com/questions/1137436/what-are-useful-javascript-methods-that-extends-built-in-objects

##function

// detect native method in object
  // not same scope of isHostObject
  isNative = function(object, method) {
    return object && method in object &&
      typeof object[method] != 'string' &&
      // IE & W3C browser return "[native code]"
      // Safari < = 2.0.4 will return "[function]"
      (/\{\s*\[native code\]\s*\}|^\[function\]$/).test(object[method]);
  }
  
  
  
  
  var isArray = (function() {
  var testString = Object.prototype.toString.call([]);
  return function(o) {
  return Object.prototype.toString.call(o) == testString;
  };
  })();

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/dundee.png)](http://travis-ci.org/stephenhandley/dundee)