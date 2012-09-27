# Description

Extend objects with methods prefixed by '_'

In progress:

[dundee-string](http://github.com/stephenhandley/dundee-string)

[dundee-array](http://github.com/stephenhandley/dundee-array)

[dundee-object](http://github.com/stephenhandley/dundee-object)

# Latest Version

2.1.0

# Installation

in package.json 

```json
{
  ...
  "dependencies": {
    "dundee": "~2.1.0"
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

Can also extend via libraries (in progress) on npm 

```js
__(String, ['capitalize', 'startsWith']);
var b = "barfotron";
b._capitalize()._startsWith('Barf'); // true
_.has(b, 'capitalize'); // true
```

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/dundee.png)](http://travis-ci.org/stephenhandley/dundee)