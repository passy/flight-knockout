/**
 * with_model
 * ----------
 * Provides 2-way bindings using knockout.js
 */

define(['knockout-es5', 'flight/lib/utils', 'jquery'], function (ko, utils, $) {
    'use strict';

    var withModel = function withModel() {
        this.defaultModel = function (attrs) {
            if(!utils.push(this._modelDefaults, attrs, true)) {
                this._modelDefaults = attrs;
            }
        };

        /**
         * Bind a `model` to a specific DOM subtree (`node`). Setting the
         * `track` option to `false` *disables* automatic model tracking. The
         * default behavior is to watch the supplied `model` for changes via ES5
         * getters and setters.
         */
        this.bindViewModel = function (node, model, track) {
            node = node || this.node;
            if (node instanceof jQuery) {
                node = node[0];
            }
            model = model || this.model;

            if (track !== false) {
                ko.track(model);
            }
            ko.applyBindings(model, node);
        };

        /**
         * Unbinds all bindings from the given DOM `node`
         */
        this.unbindViewModel = function (node) {
            node = node || this.node;
            if (node instanceof jQuery) {
                node = node[0];
            }

            ko.cleanNode(node);
        };

        /**
         * Add a subscription to the current model. The callback is called
         * whenever the observed property changes.
         *
         * @param property String name of the property
         * @param callback Function function called with the new value
         * @return Subscription Object with a `dispose` method to unsubscribe.
         */
        this.subscribeTo = function (property, callback) {
            return ko.getObservable(this.model,
                property).subscribe(callback.bind(this));
        };

        this.after('initialize', function () {
            this.model = $.extend(true, {}, this._modelDefaults || {});
        });
    };

    return withModel;
});
