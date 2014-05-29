function properties (obj, shallow) {
  // wtf js
  if (Type(obj, String)) {
    obj = obj.constructor.prototype;
  }

  var props = Object.getOwnPropertyNames(obj);

  var proto = obj;
  while (proto = Object.getPrototypeOf(proto)) {
    Object.getOwnPropertyNames(proto).forEach(function (prop) {
      // add properties if they aren't already there
      if (props.indexOf(prop) === -1) {
        props.push(prop);
      }
    });

    // leave the loop after the first pass if we only want
    // to include the object and its immediate prototype
    if (shallow) {
      break;
    }
  }

  return props;
}
