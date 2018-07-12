'use strict';

(function () {
  var MAP_PIN_ICON_HEIGHT = 64;
  var TAIL_HEIGHT = 22;
  var MAP_PIN_WIDTH = 64;
  var MAP_PIN_HEIGHT = MAP_PIN_ICON_HEIGHT + TAIL_HEIGHT;
  var DEFAULT_MAP_PIN_X = 570;
  var DEFAULT_MAP_PIN_Y = 375;

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var mapPinAddress = document.querySelector('#address');

  // Определение координат метки
  var calculateAddress = function () {
    var pinMainX = parseInt(pinMain.style.left, 10) + MAP_PIN_WIDTH / 2;
    var pinMainY = parseInt(pinMain.style.top, 10) + MAP_PIN_ICON_HEIGHT / 2;
    if (!(map.classList.contains('map--faded'))) {
      pinMainY += MAP_PIN_ICON_HEIGHT / 2 + TAIL_HEIGHT;
    }
    return pinMainX + ', ' + pinMainY;
  };

  mapPinAddress.value = calculateAddress();

  var setInactive = function () {
    map.classList.add('map--faded');
    pinMain.style.left = DEFAULT_MAP_PIN_X + 'px';
    pinMain.style.top = DEFAULT_MAP_PIN_Y + 'px';
    pinMain.addEventListener('click', onPinMainClick);
  };

  var onPinMainClick = function () {
    window.backend.load(function (marks) {
      window.marks = marks;
      window.pin.renderAllMarks(marks);
    }, window.form.onError);
    map.classList.remove('map--faded');
    mapPinAddress.value = calculateAddress();
    window.form.enable();
    pinMain.removeEventListener('click', onPinMainClick);
  };

  setInactive();

  window.map = {
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    calculateAddress: calculateAddress,
    setInactive: setInactive,
  };
})();
