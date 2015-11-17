# datafactory

A lightweight node package for creating test data, demo data and fixtures.

# Example Usage

````
import DataFactory from 'datafactory';

let demoData = new DataFactory({
  organization: {
    _id: randomId(),
    name: 'Example organization'
  },

  user: {
    _id: randomId(),
    name: 'Joe Smith',
    // Assign the user to the first organization in the group by default
    organizationId: (group) => {
      const organizations = group.data.organization;
      if (organizations) return organization[0]._id;
    }
  },

  tweet: (group) => {
    const tweet = { _id: randomId(), text: 'Hi!' };

    // Assign the tweet to the first user in the group by default
    if (group.data.user) {
      tweet.userId = group.data.user[0]._id;
    }

    return tweet;
  })
});

export function generateDemoData() {
  let group = demoData.createGroup();
  
  // Generate an organization, a user for the organization, and a tweet for the user.
  group.organization().user().tweet({ text: '@Elisabeth cool demo data!' });

  // Create another user and a tweet for them
  let elisabeth = group.user({ name: 'Elisabeth' });
  group.tweet({ userId: elisabeth._id, text: '@Joe Thanks!' });

  console.log('Generated documents', group.data);
}
````

## Contributing

Follow the [airbnb styleguide](https://github.com/airbnb/javascript#ecmascript-6-styles).

I recommend setting up the [`babel` and `eslint` plugins for sublime](http://jonathancreamer.com/setup-eslint-with-es6-in-sublime-text).

Requires node `^5.0.0`.

```
npm install 
```

* `npm run production` - Build task that generates minified scripts for production
* `npm run precommit` - Run the unit tests and generate a minified script
* `npm run clean` - Remove the `dist` folder
* `npm run eslint:source` - Lint the source
* `npm run eslint:common` - Lint the unit tests shared by Karma and Mocha
* `npm run clean` - Remove the coverage report and the *dist* folder
* `npm run test` - Runs unit tests for both server and the browser
* `npm run test:browser` - Runs the unit tests for browser / client
* `npm run test:server` - Runs the unit tests on the server
* `npm run watch:server` - Run all unit tests for server & watch files for changes
* `npm run watch:browser` - Run all unit tests for browser & watch files for changes
* `npm run karma:firefox` - Run all unit tests with Karma & Firefox
* `npm run karma:chrome` - Run all unit tests with Karma & Chrome
* `npm run packages` - List installed packages
* `npm run package:purge` - Remove all dependencies
* `npm run package:reinstall` - Reinstall all dependencies
* `npm run package:updates` - shows a list over dependencies with a higher version number then the current one - if any 
* `npm run package:upgrade` - Automaticly upgrade all dependencies and update package.json

## Contributors

Thank you [@kflash](https://github.com/Kflash) for [trolly](https://github.com/Kflash/trolly) the skeleton this project was started with.

## License
MIT © [Dispatch](https://github.com/dispatchme)
