import trolly from '../src';

describe('trolly - server and browser tests', () => {

    describe('trolly', () => {

        describe('Example function', () => {

            it('should say "hello"', () => {
                expect(trolly.example()).to.eql('hello');
            });

			it('should say "world!"', () => {
                expect(trolly.fooBar()).to.eql('world!');
            });
        });
    });

    it('should be a function', () => {
        expect(typeof trolly.example).to.eql('function');
    });
});