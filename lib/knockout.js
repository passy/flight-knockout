define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(knockout);

  /**
   * Module function
   */

  function knockout() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {

    });
  }

});
