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

class Group {
  constructor(factory) {
    const self = this;

    self.data = {};

    // Create builder functions
    _.forOwn(factory._builders, (defaults, key) => {
      const groupBuilder = (opts) => {
        const output = buildValue(defaults, opts, self);

        let dataKey = key;
        // If there is a namespace (ex. 'address.hq') store the build docs on 'address'
        if (dataKey.indexOf('.')) {
          dataKey = key.split('.')[0];
        }

        // track the build doc in the group data
        const builtDocs = self.data[dataKey] || [];
        builtDocs.push(output);
        self.data[dataKey] = builtDocs;

        // Return the group to allow chaining
        return self;
      }

      // Allow builders to be namespaced via '.'
      // ex. 'addresses.hq' -> factory.addresses.hq();
      if (key.indexOf('.') > -1) {
        parseDotNotation(key, groupBuilder, self);
      } else {
        self[key] = groupBuilder;
      }
    });
  }

}

export default class DataFactory {
  constructor(builders) {
    const self = this;

    self._builders = builders;

    // Create a builder function for each root key
    _.forOwn(builders, (defaults, key) => {
      const builder = (opts, group) => {
        return buildValue(defaults, opts, null);
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

  createGroup() {
    return new Group(this);
  }
}
