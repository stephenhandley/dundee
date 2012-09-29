function _capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalize () {
  return _capitalize(this);
}

function camelize () {
  if (!this.match(/[_\s]+/)) { return this; }
  var tokens = this.toLowerCase().replace(/\s/g, '_').split('_');
  return tokens.shift() + tokens.map(_capitalize).join('');
}

function underscorize () {
  var result = this.replace(/([a-zA-Z])([0-9])/g, '$1_$2');
  result = result.replace(/([a-z0-9A-Z])([A-Z])/g, '$1_$2');
  result = result.replace(/\s/g, '_');
  return result.toLowerCase();
}

function contains (str) {
  return (this.indexOf(str) !== -1);
}

function startsWith (str) {
  return (this.indexOf(str) === 0);
}

function endsWith (str) {
  return (this.lastIndexOf(str) === (this.length - str.length));
}

module.exports = {
  capitalize: capitalize,
  camelize: camelize,
  underscorize: underscorize,
  contains: contains,
  startsWith: startsWith,
  endsWith: endsWith,
  pluralize: require('./pluralize')
};
