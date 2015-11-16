# Universal (isomorphic) boilerplate written in ES2015 for Node and the browser.

[![Travis Status][trav_img]][trav_site]
[![devDependency Status](https://david-dm.org/kflash/trolly/dev-status.svg)](https://david-dm.org/kflash/trolly#info=devDependencies)
[![Dependency Status](https://david-dm.org/kflash/trolly.svg)](https://david-dm.org/kflash/trolly)

> A starter kit to get you up and running with a bunch of awesome new front-end technologies using Babel, Webpack, Mocha, Sinon-chai, Karma, Coveralls, and ESLint without any framework dependencies.

## Requirements

Node `^5.0.0`.

## Features

* [ES6 with Babel](http://babeljs.io/) for ES6 and ES7
* Universal unit tests that work in Node and in the browser
* Support for ES2015 in the unit tests
* [Webpack](https://webpack.github.io/) for bundling
* [Eslint](http://eslint.org/) to maintain a consistent code style
* UMD pattern, which provides compatibility with the most popular script loaders, to the output.
* Unit tests for browser, server or both
* Run unit tests for PhantomJS, Chrome, Firefox and IE
* Coveralls
* Displays build status system notifications
* Hot Module Replacement (WDS)
* Environment variables
* Asset server on port 8080
* Node >= 5.x

## Babel >= 6.x design changes

If you migrate from `Babel >= 5.x` to `Babel >= 6.x`, your code will probably break because 
Babel now have killed the `CommonJS` default export behaviour. 

As a workaround, replace `export default { … }` with  `module.exports = { … }`

## Getting Started

Just clone the repo and install the necessary node modules:
```js
$ git clone https://github.com/kflash/trolly.git trolly
$ cd trolly
$ npm install                   # Install Node modules listed in ./package.json
$ npm webpack                   # Build a non-minified version of the library
```

## Usage

* `npm run production` - Build task that generates minified scripts for production
* `npm run precommit` - Run the unit tests,, and generate a minified script
* `npm run clean` - Remove the `dist` folder
* `npm run eslint:source` - Lint the source
* `npm run eslint:common` - Lint the unit tests shared by Karma and Mocha
* `npm run eslint:server` - Lint the unit tests for server
* `npm run eslint:browser` - Lint the unit tests for browser
* `npm run clean` - Remove the coverage report and the *dist* folder
* `npm run test` - Runs unit tests for both server and the browser
* `npm run test:browser` - Runs the unit tests for browser / client
* `npm run test:server` - Runs the unit tests on the server
* `npm run watch:server` - Run all unit tests for server & watch files for changes
* `npm run watch:browser` - Run all unit tests for browser & watch files for changes
* `npm run karma:firefox` - Run all unit tests with Karma & Firefox
* `npm run karma:chrome` - Run all unit tests with Karma & Chrome
* `npm run karma:ie` - Run all unit tests with Karma & Internet Explorer
* `npm run packages` - List installed packages
* `npm run package:purge` - Remove all dependencies
* `npm run package:reinstall` - Reinstall all dependencies
* `npm run package:updates` - shows a list over dependencies with a higher version number then the current one - if any 
* `npm run package:upgrade` - Automaticly upgrade all dependencies and update package.json
* `npm run asset-server` - starts a asset server with hot module replacement (WDS) on port 8080


## Unit tests

This project uses Mocha to run your unit tests, it uses Karma as the test runner, it enables the feature that you are able to render your tests to the browser (e.g: Firefox, Chrome etc.).

To add a unit test, simply create `.common.js` file inside the `~/test` folder. Karma will pick up on these files automatically, and Mocha and Chai will be available within your unit tests without the need to import them.

To run unit tests only for the browser ( *client*), simply create a `.browser.js` file, or if you need to run unit tests only for the server, create a `.server.js` file inside the `~/test` folder.

Tests for both client and server share the same `.common.js` files,

To run the tests in the project, just simply `npm run test` for both server and client unit tests, or `npm run test:server`. for server or `npm run test:browser`. for browser tests.

To keep watching the common test suites that you are working on, simply do `npm run watch:browser` or `npm run watch:server`.

## Coveralls

This library is set up to integrate with Coveralls, and will automaticly publish your coverage report if you have created an account for your repo at **coveralls.io**

## Linting

This boilerplate project uses ESLint to lint your source. To change the rules, edit the .eslintrc file in the root directory, respectively.

## Asset server

Trolly uses `webpack-dev-server` as an asset server with hot module replacement (WDS) enabled on port 8080.

```js
npm run asset-server
```

Open `http://localhost:8080`, and you will see this message in your browser: `It works!`.

## Installation

Download the package, and run this from the command line:

```
npm install 
```

## Customizing

This boilerplate is easily customizable. Add your dependencies to the package.json file, and modify either the webpack config files or the karma files itself. 

For the server side unit tests with mocha, you may want to install jsdom etc. This can be done if you modify the `mocha.conf.js` file located inside the `config folder`.

All paths, and the name on the library can be modified inside the `config.js` file.

## Known Mac issues
There are a know issue with `Node 4.1` on Mac. To solve this issue, upgrade to `Node >= 5.x`.

## FAQ

#### Help! It doesn't work on Windows! What do I do?
Just take a cup of coffee and relax. It works!

#### Is this boilerplate production ready?
Yes, for small applications. For a larger project, you'll need to customize the boilerplate after your own needs, but that is out of scope of this boilerplate.

#### How do I get this boilerplate working with React?

To get it working with *React*, you have to add the `babel-preset-react` , `react 14.x` and the `react-dom 14.x` dependencies  to your `package.json`. After that you have to add `react` to the *presets* section inside your `babelrc` file. Note that you would need to import the React library in your unit tests to get `JSX` working.`

#### Why is there so many webpack configuration files?

Short answer. Too keep the file size as compact as possible. Each plugin take up tons of code lines. Example if you merge the development configuration file with the server configuration file, you will end up with a development version with a filsize 4 - 5 times larger then what it is now.

#### Is there any environment variabels for production and development?

Yes, there is. You have to configure this yourself. Just modify the `environment.js` file inside the `./config folder`.

There exist one example on how to use environment variabels. Take a look at the `webpack.config.js` file in the root.

## How to Contribute

If you see any bugs, or have any ideas regarding how to improve this boilerplate,, please do not hesitate to send a pull request.

## License
MIT © [KFlash](https://github.com/kflash)

[trav_img]: https://api.travis-ci.org/Kflash/trolly.svg
[trav_site]: https://travis-ci.org/Kflash/trolly.svg?branch=master

