import _ from 'lodash';

// Set the value to the namespace built from the path
// ex path='addresses.hq', value=1, set obj.addresses.hq = 1;
export function parseDotNotation(path, val, obj) {
  const keys = path.split('.');
  let currentObj = obj;

  let i = 0;
  for (; i < Math.max(1, keys.length - 1); i += 1) {
    const key = keys[i];
    currentObj[key] = currentObj[key] || {};
    currentObj = currentObj[key];
  }

  currentObj[keys[i]] = val;
  // eslint-disable-next-line no-param-reassign
  delete obj[path];
}

export function buildValue(defaults, opts, group) {
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
