import _ from 'lodash';
import { parseDotNotation, buildValue } from './helpers';

class Group {
  constructor(factory) {
    const self = this;

    self.data = {};

    // Create builder functions
    _.forOwn(factory.builders, (defaults, key) => {
      const groupBuilder = (opts) => {
        const output = buildValue(defaults, opts, self);

        let dataKey = key;
        // If there is a namespace (ex. 'address.hq') store the build docs on 'address'
        if (dataKey.indexOf('.')) {
          [dataKey] = key.split('.');
        }

        // track the build doc in the group data
        const builtDocs = self.data[dataKey] || [];
        builtDocs.push(output);
        self.data[dataKey] = builtDocs;

        // Return the group to allow chaining and
        // expose the output as the value property.
        return _.extend({ value: output }, self);
      };

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

export default Group;
