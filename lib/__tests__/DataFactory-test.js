import DataFactory from '../DataFactory';

describe('DataFactory', () => {
  describe('constructor', () => {
    it('should generate builder functions for each root key', () => {
      const testData = new DataFactory({
        organization: {
          name: 'Example organization',
        },
        'address.hq': {
          location: 'HQ',
        },
        'address.downtown': {
          location: 'Downtown',
        },
      });

      expect(testData.organization).toBeA('function');
      expect(testData.address.hq).toBeA('function');
      expect(testData.address.downtown).toBeA('function');
    });
  });

  describe('builder functions', () => {
    describe('with default values', () => {
      const testData = new DataFactory({
        organization: {
          name: 'ACME',
        },
        'address.hq': {
          location: 'HQ',
        },
      });

      it('should generate the default values', () => {
        expect(testData.organization()).toEqual({
          name: 'ACME',
        });

        expect(testData.address.hq()).toEqual({
          location: 'HQ',
        });
      });

      it('should override the default values with the options', () => {
        expect(testData.organization({
          name: 'ACME2',
          foo: 'bar',
        })).toEqual({
          name: 'ACME2',
          foo: 'bar',
        });

        expect(testData.address.hq({
          location: 'Beach Office',
        })).toEqual({
          location: 'Beach Office',
        });
      });
    });

    describe('with default function values', () => {
      const testData = new DataFactory({
        organization: {
          name: () => 'ACME',
        },
        'address.hq': () => ({
          location: 'HQ',
        }),
      });

      it('should generate the default values', () => {
        expect(testData.organization()).toEqual({
          name: 'ACME',
        });

        expect(testData.address.hq()).toEqual({
          location: 'HQ',
        });
      });

      it('should override the default values with the options', () => {
        expect(testData.organization({
          name: 'ACME2',
          foo: 'bar',
        })).toEqual({
          name: 'ACME2',
          foo: 'bar',
        });

        expect(testData.address.hq({
          location: 'Beach Office',
        })).toEqual({
          location: 'Beach Office',
        });
      });
    });
  });

  describe('createGroup', () => {
    let id = -1;
    const generateId = () => { id += 1; return id; };

    const testData = new DataFactory({
      organization: {
        _id: generateId,
        name: 'ACME',
      },
      'address.hq': {
        _id: generateId,
        location: 'HQ',
        organizationId: (group) => {
          if (group && group.data.organization) {
            // eslint-disable-next-line no-underscore-dangle
            return group.data.organization[0]._id;
          }
          return null;
        },
      },
    });

    it('should allow chaining', () => {
      id = -1;
      const group = testData.createGroup().organization().address.hq();
      expect(group.data).toEqual({
        organization: [{
          _id: 0,
          name: 'ACME',
        }],
        address: [{
          _id: 1,
          location: 'HQ',
          organizationId: 0,
        }],
      });
    });

    it('should expose the value on the builder result', () => {
      id = -1;
      const group = testData.createGroup().organization().address.hq();
      const address = group.value;

      expect(address).toEqual({
        _id: 1,
        location: 'HQ',
        organizationId: 0,
      });
    });

    it('should pass the group to builder functions', () => {
      id = -1;

      const group = testData.createGroup();

      group.organization();
      group.address.hq();
      group.organization();
      group.address.hq();

      expect(group.data).toEqual({
        organization: [{
          _id: 0,
          name: 'ACME',
        }, {
          _id: 2,
          name: 'ACME',
        }],
        address: [{
          _id: 1,
          location: 'HQ',
          organizationId: 0,
        }, {
          _id: 3,
          location: 'HQ',
          organizationId: 0,
        }],
      });
    });
  });
});
