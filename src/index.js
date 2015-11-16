import fooBar from './fooBar';

/**
* Migrating from Babel >= 5.x to Babel >= 6.x, will most likely break your code
* because Babel now have killed the CommonJS default export behaviour.
*
As a workaround, replace export default { … } with module.exports = { … }
*/

const trolly = {
  fooBar,
  example() {
    return 'hello';
  }
};

module.exports = trolly;
