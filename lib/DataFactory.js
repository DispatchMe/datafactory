import _ from 'lodash';
import Group from './Group';
import { parseDotNotation, buildValue } from './helpers';

class DataFactory {
  constructor(builders) {
    const self = this;

    self.builders = builders;

    // Create a builder function for each root key
    _.forOwn(builders, (defaults, key) => {
      const builder = (opts) => buildValue(defaults, opts, null);

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

export default DataFactory;
