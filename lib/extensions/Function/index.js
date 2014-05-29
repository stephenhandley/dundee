var Type = require('type-of-is');
var rmerge = require('../Object').rmerge;

function delay (options) {
  //   time    : delay time in milliseconds
  //   self   : object that will be this for method when called
  //   args   : arguments to method
  //   repeat : whether or not to repeat

  rmerge.call(options, {
    self  : null,
    args   : [],
    repeat : false
  });
  
  var fn = this;
  var _delayer =  options.repeat ? setInterval : setTimeout;

  return _delayer(function () {
    fn.apply(options.self, options.args);
  }, options.time);
}

function repeat (options) {
  if (!options.time) {
    throw "must provide time option to repeat"
  }
  options.repeat = true;

  return delay.call(this, options);
}

module.exports = {
  delay    : delay,
  repeat   : repeat
};

