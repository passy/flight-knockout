/*global jasmine */
define(function (require) {
    'use strict';

    var defineComponent = require('flight/lib/component');
    var withModel = require('lib/with_model');

    function testEmptyComponent() {
    }

    function testModelComponent() {
        this.defaultModel({
            a: 1,
            b: 2,
            c: { d: 3, e: 4 }
        });
    }

    function testMutatingComponent() {
        this.defaultModel({
            a: 1
        });

        this.after('initialize', function () {
            this.model.a = 2;
        });
    }

    function testTemplateComponent() {
        var tmpl = 'Hello, <div data-bind="text: obj">World</div>';

        this.defaultModel({
            obj: 'Doge'
        });

        this.after('initialize', function () {
            $('<div id="tmpl"></div>').html(tmpl).appendTo(this.$node);
            this.bindViewModel(this.node, this.model);
        });

        this.before('teardown', function () {
            this.unbindViewModel();
        });
    }

    function withConflictingModel() {
        this.defaultModel({
            b: 3
        });
    }

    describe('withModel construction', function () {
        it('constructs an empty component', function () {
            var TestComponent = defineComponent(withModel, testEmptyComponent);
            var comp = (new TestComponent()).initialize(document.body);

            expect(comp.model).toEqual({});
        });

        it('constructs a non-empty component', function () {
            var TestComponent = defineComponent(withModel, testModelComponent);
            var comp = (new TestComponent()).initialize(document.body);

            expect(comp.model.a).toEqual(1);
            expect(comp.model.c.d).toEqual(3);
        });

        it('handles conflicting model properties', function () {
            var err = new Error('utils.push attempted to overwrite "b" while running in protected mode');
            expect(function () {
                defineComponent(withModel, testModelComponent, withConflictingModel);
            }).toThrow(err);
        });

        it('allows overriding of properties', function () {
            var TestComponent = defineComponent(withModel, testMutatingComponent);
            var cmp = (new TestComponent()).initialize(document.body);

            expect(cmp.model.a).toBe(2);
        });


        it('does not conflict with other constructions', function () {
            var ModelComponent = defineComponent(withModel, testModelComponent);
            var TestComponent = defineComponent(withModel, testEmptyComponent);
            var compFilled = (new ModelComponent()).initialize(document.body);
            var compEmpty = (new TestComponent()).initialize(document.body);

            expect(compFilled.model.a).toBe(1);
            expect(compEmpty.model.a).toBeUndefined();
        });

        it('does allow data-binding', function () {
            var TemplateComponent = defineComponent(withModel, testTemplateComponent);
            var comp = (new TemplateComponent()).initialize(document.body);

            expect(comp.$node.find('#tmpl').text()).toBe('Hello, Doge');
            comp.teardown();
        });

        it('should allow observable subscriptions', function () {
            var ModelComponent = defineComponent(withModel, testTemplateComponent);
            var spy = jasmine.createSpy();
            var comp = (new ModelComponent()).initialize(document.body);

            comp.subscribeTo('obj', spy);
            comp.model.obj = 'Tom';

            expect(spy).toHaveBeenCalledWith('Tom');
            comp.teardown();
        });

        it('should allow observable unsubscriptions', function () {
            var ModelComponent = defineComponent(withModel, testTemplateComponent);
            var spy = jasmine.createSpy();
            var comp = (new ModelComponent()).initialize(document.body);

            var subsc = comp.subscribeTo('obj', spy);
            subsc.dispose();
            comp.model.obj = 'Tom';

            expect(spy).not.toHaveBeenCalled();
            comp.teardown();
        });
    });

});
