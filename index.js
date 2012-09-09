var prefix = '_';

module.exports = function (obj, methods) {
  Object.getOwnPropertyNames(methods).forEach(function (method_name) {
    obj.prototype[prefix + method_name] = methods[method_name];
  });
}
