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
    let id = 0;
    const generateId = () => {
      return id++;
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
      id = 0;
      let group = testData.createGroup().organization().address.hq();
      expect(group.data).to.deep.equal({
        organization: [{
          _id: 0,
          name: 'ACME'
        }],
        address: [{
          _id: 1,
          location: 'HQ',
          organizationId: 0
        }]
      });
    });

    it('should pass the group to builder functions', () => {
      id = 0;

      let group = testData.createGroup();

      group.organization();
      group.address.hq();
      group.organization();
      group.address.hq();

      expect(group.data).to.deep.equal({
        organization: [{
          _id: 0,
          name: 'ACME'
        }, {
          _id: 2,
          name: 'ACME'
        }],
        address: [{
          _id: 1,
          location: 'HQ',
          organizationId: 0
        }, {
          _id: 3,
          location: 'HQ',
          organizationId: 0
        }]
      });
    });

  });
});
