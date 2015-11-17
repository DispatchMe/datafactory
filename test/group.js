import DataFactory from '../src';

let i = 0;
const generateId = () => {
  return i++;
}

describe('DataFactory', () => {

  describe('constructor', () => {

    it('should generate named builder functions', () => {

      const testData = new DataFactory({
        organization: {
          name: 'Example organization'
        },
        user: {
          name: 'Joe Smith'
        },
        'address.hq': {
          name: 'HQ'
        },
        'address.downtown': {
          name: 'Downtown'
        }
      });

      expect(testData.organization).to.be.a('function');
      expect(testData.user).to.be.a('function');

      // expect(testData.address.hq).to.be.a('function');
      // expect(testData.address.downtown).to.be.a('function');
    });

  });

  describe('builder functions', () => {

    describe('with default values', () => {

      it('should generate the default values', () => {

      });

      it('should override the default values with the options', () => {

      });

    });

    describe('with default function values', () => {

      it('should generate the default values', () => {

      });

      it('should override the default values with the options', () => {

      });

    });

  });

  describe('group', () => {

    it('should generate data', () => {

    });

  });
});
