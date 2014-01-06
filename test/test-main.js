'use strict';

var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return (/\.spec\.js$/.test(file));
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
        'flight': 'bower_components/flight',
        'knockout-es5': 'bower_components/knockout-es5-passy/dist/knockout-es5',
        'knockout': 'bower_components/component-knockout-passy/knockout',
        'jquery': 'bower_components/jquery/jquery'
    },

    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
