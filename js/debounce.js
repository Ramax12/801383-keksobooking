'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimout;
  window.debounce = function (fun) {
    if (lastTimout) {
      window.clearTimeout(lastTimout);
    }
    lastTimout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})();
