import trolly from '../src';

describe('trolly - browser tests', () => {

    describe('trolly', () => {

        describe('Example function', () => {

            it('should say "hello"', () => {
                expect(trolly.example()).to.eql('hello');
            });

            it('should say "world!"', () => {
                expect(trolly.fooBar()).to.eql('world!');
            });
        });

        describe('Browser stuff', () => {

            it('should handle document', () => {
                expect(typeof document).to.eql('object');
            });

        });
    });

    it('should be a function', () => {
        expect(typeof trolly.example).to.eql('function');
    });
});