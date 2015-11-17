import _ from 'lodash';

export default class DataFactory {
  constructor(defaults) {

    const self = this;

    // Build a generator function for each option
    _.forOwn(defaults, (value, key) => {
      self[key] = () => {
        console.log('TODO')
      };
    });

    console.log('Make me a factory damnit!');
  }
}
