# flight-knockout

[![Build Status](https://secure.travis-ci.org/passy/flight-knockout.png)](http://travis-ci.org/passy/flight-knockout)
[![Code Climate](https://codeclimate.com/github/passy/flight-knockout.png)](https://codeclimate.com/github/passy/flight-knockout)
[![Analytics](https://ga-beacon.appspot.com/UA-587894-18/flight-knockout/readme)](https://github.com/igrigorik/ga-beacon)

A [Flight](https://github.com/flightjs/flight) mixin for data-binding with
[Knockout](http://knockoutjs.com/).

## Installation

Install through [Bower](https://github.com/bower/bower):

```bash
bower install --save flight-knockout
```

Configure [RequireJS](http://requirejs.org/):

```js
requirejs.config({
    ...
    paths: {
        'flight': 'bower_components/flight',
        'knockout': 'bower_components/component-knockout-passy/knockout',
        'knockout-es5': 'bower_components/knockout-es5-passy/dist/knockout-es5'
    }
});
```

## Example

*example.html*
```html
<input data-bind="value: name">
<p>
    Name: <span data-bind="text: name"></span>
</p>
<button class="js-btn-cornify">Cornify</button>
```

```js
define([
    'flight/lib/component',
    'with_model',
    'with_template'
], function (defineComponent, withModel, withTemplate) {
        function example() {
            this.defaultAttrs({
                buttonSelector: '.js-btn-cornify',
            });

            this.defaultModel({
                name: 'No Name'
            });

            this.after('initialize', function () {
                this.on('click', {
                    buttonSelector: handleButton
                });

                // Assuming that `with_template` provides this for you.
                this.renderTemplate('example.html');
                this.bindViewModel();
            });

            this.handleButton = function () {
                this.model.name = 'Sparkly ' + this.model.name + ' Sunshine';
            };
        };

        // withModel has to come before your component so
        // defaultModel works.
        return defineComponent(withModel, example, withTemplate);
    }
);
```

## API

### `withModel.defaultModel(attrs)`

Works analogous to `defaultAttr`. Takes an object and sets the default values of
`this.model`.

```js
this.defaultModel({
    animal: 'Pony',
    awesomeDude: 'Stephen'
});
```

These values are set during the `initalize` phase.

### `withModel.bindViewModel([node, model, track])`

Bind a `model` to a specific DOM subtree (`node`). `node` defaults to the
node managed by the component, but can be overriden, e.g. for mixins. Setting
the `track` option to `false` *disables* automatic model tracking. The default
behavior is to watch the supplied `model` for changes via ES5 getters and
setters.

### `withModel.unbindViewModel([node])`

Unbinds all bindings from the given DOM `node`.

### `withModel.subscribeTo(property, callback)`

Add a subscription to the current model. The callback is called
whenever the observed property changes.

- `property`: String name of the property
- `callback`: Function function called with the new value
- returns a `Subscription` Object with a `dispose` method to unsubscribe.

## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
