# Changelog

## 0.7.2
- re-factored how the asset server works
- added more `ESLint` rules
- moved `index.html` from root to `/templates/index.html`
- added sourcemap for Karma
- fixed issue with auto-watch for Karma

## 0.7.0
* added and improved the asset server. See the readme file.
* added support for both `sinon-chai`, and `sinon`, `chai` in the unit tests
* improved the build process
* improved development mode
* added eslint option both for dev-and production mode

## 0.6.7
* added support for environment variabels. See the FAQ section in the readme.

## 0.6.3
* solved issues with the unit tests

## 0.6.2
* Fixed bug with Mocha setup

## 0.6.1
* lint tasks renamed to eslint tasks. E.g `npm run eslint:source`
*  updated to latest mocha
*   minor bug fixes

## 0.5.6
* fixed a bug with production mode
*  BC! `Build` renamed to `production` - `npm run production`

## 0.5.2

- BC! Changed how unit tests works. Unit tests are merged into one folder - `./tests`. Unit tests for browser: `.browser.js`.  Unit tests for server: `.server.js`.
- BC! Unit tests - `.common.js` runs both for Karma and Mocha.
- BC! Coverage report for common unit tests - available with Karma.  `npm run test:browser`. 
- BC! Removed Isparta because of Babel 6.x issues
- BC! Mocha have got it's own configuration file. Located in `./config/mocha.opts`. 
- BC! Eslint got more options. Check out the readme file.
- General cleanup
