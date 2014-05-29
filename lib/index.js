var Path   = require('path');
var Dotmix = require('dotmix');
var Type   = require('type-of-is');

// so bundling with browserify works
var extensions = {
  'Array'    : require('./extensions/Array'),
  'Object'   : require('./extensions/Object'),
  'String'   : require('./extensions/String'),
  'Function' : require('./extensions/Function')
};

var PREFIX = '_'

function Extension (Type) {
  this.Type       = Type;
  this.extensions = extensions[Type.name];
  this.included   = [];
}

Extension.prototype.include = function include (args) {
  var from_extensions = true;
  var to_include;
  
  switch (Type(args)) {
    // No args means include all extensions
    case undefined : 
      to_include = Object.keys(this.extensions);
      break;
    
    // Make string arg into array
    case String : 
      to_include = [args];
      break;
      
    // User defined functions
    case Object : 
      to_include = args;
      from_extensions = false;
      break;
    
    case Array :
      to_include = args;
      break;
      
    default : 
      throw "Invalid argument passed to Dundee." + this.Type.name + ".include";
  }
    
  var to_mix = {
    into    : this.Type,
    prefix  : PREFIX
  }
  
  if (from_extensions) {
    var filtered_to_include = [];
  
    for (var i = 0, len = to_include.length; i < len; i++) {
      var fn_name = to_include[i];
    
      if (!this.extensions.hasOwnProperty(fn_name)) {
        throw "no extension exists for " + fn_name + " in " + this.Type.name;
      }
    
      if (this.included.indexOf(fn_name) === -1) {
        this.included.push(fn_name)
        filtered_to_include.push(fn_name);
      }
    }
    
    to_mix.from = {
      include : this.extensions
    };
    to_mix.include = filtered_to_include;
        
  } else {
    to_mix.from = {
      include : args
    };
  }
  
  Dotmix.mix(to_mix);
};

Extension.prototype.remove = function remove (args) {
  var to_remove; 
  
  switch (Type(args)) {
    case undefined : 
      to_remove = this.included;
      break;
      
    case String : 
      to_remove = [args];
      break;
      
    case Array : 
      to_remove = args;
      break;
    
    default : 
      throw "Invalid argument passed to Dundee." + this.Type.name + ".remove";
  }
  
  var removed = [];
  for (var i = 0, len = to_remove.length; i < len; i++) {
    var fn_name = to_remove[i];
    if (this.included.indexOf(fn_name) !== -1) {
      removed.push(fn_name);
      delete this.Type.prototype[PREFIX + fn_name]
    }
  };
  
  this.included = this.included.filter(function (fn_name) {
    return (removed.indexOf(fn_name) === -1)
  });
};

var Dundee = {};

var extendables = [Array, Object, String, Function];

extendables.forEach(function (T) {
  Dundee[T.name] = new Extension(T);
});

module.exports = Dundee;
