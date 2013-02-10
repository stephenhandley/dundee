var Path = require('path');

// so bundling with browserify works
var extensions = {
  'Array': require('./extensions/array'),
  'Object': require('./extensions/object'),
  'String': require('./extensions/string')
};

function Dundee(Type, methods, filter) {
  if (arguments.length < 3) { filter = null; }
  if (arguments.length == 1) { methods = null; }
  if (arguments.length == 0) {
    throw new Error("First argument must be constructor whose prototype you want to attach to.");
  }
  
  if (methods) {
    if (methods.constructor === String) {
      methods = [methods];
    }
  
    if (methods.constructor === Array) {
      filter = methods;
      methods = null;
    }
  }
  
  if (!methods) {
    methods = _requireExtension(Type);
  }
  
  Object.getOwnPropertyNames(methods).forEach(function (method_name) {
    if (!filter || (filter.indexOf(method_name) !== -1)) {
      _attach(Type, method_name, methods[method_name]);
    }
  });
};

function _prefix(method_name) {
  var prefix = '_';
  return prefix + method_name;
}


function _attach (Type, method_name, method) {
  var proto = Type.prototype;
  var dundee_ns = _prefix('dundee')
  var method_ns = _prefix(method_name)
  
  if (!proto[dundee_ns]) { 
    proto[dundee_ns] = []; 
  }
  
  var existing = !!proto[method_ns];
  if (existing) {
    throw ("Dundee attach of " + method_ns + " to " + proto.name + " would overwrite existing property.");
  }
  
  var attached = (proto[dundee_ns].indexOf(method_name) !== -1);
  if (!attached) {
    proto[dundee_ns].push(method_name);
    proto[method_ns] = method;
  }
}

function remove (Type, method_names) {
  var proto = Type.prototype;
  
  if (!proto._dundee) { return; }  
  if (arguments.length == 1) {
    method_names = proto._dundee;
  }
  
  if (method_names.constructor !== Array) {
    method_names = [method_names];
  }
  
  method_names.slice(0).forEach(function (method_name) {
    var pos = proto._dundee.indexOf(method_name);
    if (pos !== -1) {
      delete proto[_prefix(method_name)];
      proto._dundee.splice(pos, 1);
    }
  });
  if (proto._dundee.length == 0) {
    delete proto._dundee;
  }
}

function has (obj, method_names) {
  var proto = obj.prototype;
  if (!proto) { proto = obj.constructor.prototype; }
  
  if (!proto._dundee) { return false; }
  
  if (method_names.constructor === String) {
    method_names = [method_names];
  }
  return method_names.every(function (method_name) {
    return (proto._dundee.indexOf(method_name) != -1);
  });
}

function _requireExtension (Type) {
  var extension_name = Type.name;
  if (extensions.hasOwnProperty(extension_name)) {
    return extensions[extension_name];
  } else {
    throw new Error('No existing dundee package for ' + extension_name);
  }
}

module.exports = Dundee;
module.exports.remove = remove;
module.exports.has = has;
