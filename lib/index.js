var Path = require('path');

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
  if (!proto.__dundee) { proto.__dundee = []; }
  if (proto.__dundee.indexOf(method_name) === -1) {
    proto.__dundee.push(method_name);
    proto[_prefix(method_name)] = method;
  }
}

function remove (Type, method_names) {
  var proto = Type.prototype;
  
  if (!proto.__dundee) { return; }  
  if (arguments.length == 1) {
    method_names = proto.__dundee;
  }
  
  if (method_names.constructor !== Array) {
    method_names = [method_names];
  }
  
  method_names.slice(0).forEach(function (method_name) {
    var pos = proto.__dundee.indexOf(method_name);
    if (pos !== -1) {
      delete proto[_prefix(method_name)];
      proto.__dundee.splice(pos, 1);
    }
  });
  if (proto.__dundee.length == 0) {
    delete proto.__dundee;
  }
}

function has (obj, method_names) {
  var proto = obj.prototype;
  if (!proto) { proto = obj.constructor.prototype; }
  
  if (!proto.__dundee) { return false; }
  
  if (method_names.constructor === String) {
    method_names = [method_names];
  }
  return method_names.every(function (method_name) {
    return (proto.__dundee.indexOf(method_name) != -1);
  });
}

function _requireExtension (Type) {
  var extension_name = Type.name.toLowerCase();
  try {  
    return require(Path.join(__dirname, 'extensions', extension_name));
  } catch (error) {
    throw new Error('No existing dundee package for ' + Type.name);
  }
}

module.exports = Dundee;
module.exports.remove = remove;
module.exports.has = has;
