# Description

Extend objects with methods prefixed by '_'

# Latest Version

2.2.0

# Installation

in package.json 

```json
{
  ...
  "dependencies": {
    "dundee": "2.2.0"
  }
  ...
}
```

# Usage

```js
var _ = require('dundee');

_(Array, {
  empty: function() {
    return (this.length === 0);
  }
});

var x = [];
x._empty(); // true
x.push(2);
x._empty(); // false
_.remove(Array, 'empty'); 
// _.remove(Array, ['list', 'of' 'methods']) removes multiple methods added by Dundee
// _.remove(Array) removes all methods added by Dundee
x._empty(); // throws error ~= /has no method/
```

Can also extend via library

```js
_(String, ['capitalize', 'startsWith']);
var b = "barfotron";
b._capitalize()._startsWith('Barf'); // true
_.has(b, 'capitalize'); // true
```

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/dundee.png)](http://travis-ci.org/stephenhandley/dundee)