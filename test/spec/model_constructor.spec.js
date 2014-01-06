define(function (require) {
    'use strict';

    var defineComponent = require('flight/lib/component');
    var withModel = require('lib/with_model');

    function simpleComponent() {
    }

    function defaultComponent() {
        this.defaultModel({
            simple: 1,
            nested: { a: 1, b: 2 }
        });
    }

    function withNonConflictingDefaults() {
        this.defaultModel({
            other: 2
        });
    }

    function withConflictingDefaults() {
        this.defaultModel({
            simple: 2,
            other: 5,
            nested: { b: 3, c: 4 }
        });
    }

    describe('simpleComponent', function () {
        beforeEach(function () {
            var Component = defineComponent(simpleComponent, withModel);
            this.instance = (new Component()).initialize(document.body);
        });
        it('should define a model', function () {
            expect(this.instance.model).toBeTruthy();
        });
    });
});
