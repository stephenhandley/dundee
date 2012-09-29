function _kvIter (fn) {
  return function (iter) {
    var _this = this;
    return Object.keys(this)[fn](function (k) {
      return iter(k, _this[k]);
    });
  }
}

module.exports = {};
['forEach', 'every', 'some'].forEach(function (fn) {
  module.exports[fn] = _kvIter(fn);
});