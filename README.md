# Description

Extend objects with methods prefixed by '_'

# Latest Version

2.5.0

# Installation

in package.json 

```json
{
  ...
  "dependencies": {
    "dundee": "2.5.0"
  }
  ...
}
```

# Usage

```js
var __ = require('dundee');

__(Array, {
  empty: function() {
    return (this.length === 0);
  }
});

var x = [];
x._empty(); // true
x.push(2);
x._empty(); // false
__.remove(Array, 'empty'); 
// _.remove(Array, ['list', 'of' 'methods']) removes multiple methods added by Dundee
// _.remove(Array) removes all methods added by Dundee
x._empty(); // throws error ~= /has no method/
```

Can also extend via library

```js
__(String, ['capitalize', 'startsWith']);
var b = "barfotron";
b._capitalize()._startsWith('Barf'); // true
__.has(b, 'capitalize'); // true
```

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/dundee.png)](http://travis-ci.org/stephenhandley/dundee)