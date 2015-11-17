import DataFactory from '../src';

describe('DataFactory', () => {

  describe('constructor', () => {

    it('should generate builder functions for each root key', () => {
      const testData = new DataFactory({
        organization: {
          name: 'Example organization'
        },
        'address.hq': {
          location: 'HQ'
        },
        'address.downtown': {
          location: 'Downtown'
        }
      });

      expect(testData.organization).to.be.a('function');
      expect(testData.address.hq).to.be.a('function');
      expect(testData.address.downtown).to.be.a('function');
    });

  });

  describe('builder functions', () => {

    describe('with default values', () => {

      const testData = new DataFactory({
        organization: {
          name: 'ACME'
        },
        'address.hq': {
          location: 'HQ'
        }
      });

      it('should generate the default values', () => {
        expect(testData.organization()).to.deep.equal({
          name: 'ACME'
        });

        expect(testData.address.hq()).to.deep.equal({
          location: 'HQ'
        });
      });

      it('should override the default values with the options', () => {

        expect(testData.organization({
          name: 'ACME2',
          foo: 'bar'
        })).to.deep.equal({
          name: 'ACME2',
          foo: 'bar'
        });

        expect(testData.address.hq({
          location: 'Beach Office'
        })).to.deep.equal({
          location: 'Beach Office'
        });

      });

    });

    describe('with default function values', () => {

      const testData = new DataFactory({
        organization: {
          name: () => {
            return 'ACME';
          }
        },
        'address.hq': () => {
          return {
            location: 'HQ'
          };
        }
      });

      it('should generate the default values', () => {
        expect(testData.organization()).to.deep.equal({
          name: 'ACME'
        });

        expect(testData.address.hq()).to.deep.equal({
          location: 'HQ'
        });
      });

      it('should override the default values with the options', () => {

        expect(testData.organization({
          name: 'ACME2',
          foo: 'bar'
        })).to.deep.equal({
          name: 'ACME2',
          foo: 'bar'
        });

        expect(testData.address.hq({
          location: 'Beach Office'
        })).to.deep.equal({
          location: 'Beach Office'
        });

      });

    });

  });

  describe('createGroup', () => {
    let i = 0;
    const generateId = () => {
      return i++;
    }

    const testData = new DataFactory({
      organization: {
        _id: generateId,
        name: 'ACME'
      },
      'address.hq': {
        _id: generateId,
        location: 'HQ',
        organizationId: (group) => {
          if (group && group.data.organization) return group.data.organization[0]._id;
        }
      }
    });

    it('should allow chaining', () => {
      let group = testData.createGroup().organization().address.hq();
      console.log('GROUP DATA', group.data);
    });

    it('should pass the group to builder functions', () => {
      let group = testData.createGroup();

      const organization = group.organization();
      const address = group.address.hq();

      expect(address.orgazationId).to.equal(organization._id);
      console.log('GROUP DATA', group.data);
    });

  });
});
