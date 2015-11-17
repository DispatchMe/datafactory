const _root = __dirname + '../../';

module.exports = {
  // path helpers 
  _app: 'datafactory',
  minified: 'datafactory.min.js',
  dev: 'datafactory.js',
  eslintDir: _root + '.eslintrc',
  distDir: _root + 'dist',
  sourceDir: _root + 'src',
  testDir: _root + 'tests',
  setupDir: _root + 'tests/setup/node.js',
  karmaConf: _root + 'config/karma.conf.js'
};
