'use strict';

(function () {
  var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var randomArray = function (array, count) {
    array.sort(function () {
      return Math.random() - 0.5;
    });
    var items = [];
    for (var i = 0; i < count; i++) {
      var item = array[i];
      items.push(item);
    }
    return items;
  };

  window.utils = {
    randomInt: randomInt,
    randomArray: randomArray
  };
})();
