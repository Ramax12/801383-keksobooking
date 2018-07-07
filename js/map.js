'use strict';

(function () {
  var MAP_PIN_WIDTH = 64;
  var MAP_PIN_HEIGHT = 64;
  var TAIL_HEIGHT = 22;

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var inactiveFields = document.querySelectorAll('fieldset');
  var adForm = document.querySelector('.ad-form');
  var mapPinAddress = document.querySelector('#address');

  // Определение координат метки
  var calculateAddress = function () {
    var pinMainX = parseInt(pinMain.style.left, 10) + MAP_PIN_WIDTH / 2;
    var pinMainY = parseInt(pinMain.style.top, 10) + MAP_PIN_HEIGHT / 2;
    if (!(map.classList.contains('map--faded'))) {
      pinMainY += MAP_PIN_HEIGHT / 2 + TAIL_HEIGHT;
    }
    return pinMainX + ', ' + pinMainY;
  };

  // Неактивное состояние
  var disablePage = function () {
    for (var i = 0; i < inactiveFields.length; i++) {
      inactiveFields[i].setAttribute('disabled', 'disabled');
    }
    mapPinAddress.value = calculateAddress();
  };
  disablePage();

  // Активное состояние
  var enablePage = function () {
    var isMapActive;
    pinMain.addEventListener('click', isMapActive = function () {
      window.backend.load(function (marks) {
        window.marks = marks;
        window.pin.renderMarksAll(marks);
      }, window.form.onError);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapPinAddress.value = calculateAddress();
      for (var i = 0; i < inactiveFields.length; i++) {
        inactiveFields[i].removeAttribute('disabled', 'disabled');
      }
      pinMain.removeEventListener('click', isMapActive);
    });
  };
  enablePage();

  window.map = {
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    calculateAddress: calculateAddress,
    disablePage: disablePage,
    enablePage: enablePage,
  };
})();
