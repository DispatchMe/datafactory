import _ from 'lodash';

// Set the value to the namespace built from the path
// ex path='addresses.hq', value=1, set obj.addresses.hq = 1;
function parseDotNotation(path, val, obj) {
  var currentObj = obj,
    keys = path.split('.'),
    i, l = Math.max(1, keys.length - 1),
    key;

  for (i = 0; i < l; ++i) {
    key = keys[i];
    currentObj[key] = currentObj[key] || {};
    currentObj = currentObj[key];
  }

  currentObj[keys[i]] = val;
  delete obj[path];
}

function buildValue(defaults, opts, group) {
  let output = {};

  // Allow the root level to be a function
  if (_.isFunction(defaults)) {
    output = defaults(group);
  } else {
    _.forOwn(defaults, (defaultVal, key) => {
      if (_.isFunction(defaultVal)) {
        output[key] = defaultVal(group);
      } else {
        output[key] = defaultVal;
      }
    });
  }

  return _.extend(output, opts);
}

export default class DataFactory {
  constructor(builders) {
    const self = this;

    // Create a builder function for each root key
    _.forOwn(builders, (defaults, key) => {
      const builder = (opts) => {
        // TODO
        const group = {};
        return buildValue(defaults, opts, group);
      };

      // Allow builders to be namespaced via '.'
      // ex. 'addresses.hq' -> factory.addresses.hq();
      if (key.indexOf('.') > -1) {
        parseDotNotation(key, builder, self);
      } else {
        self[key] = builder;
      }
    });
  }
}
